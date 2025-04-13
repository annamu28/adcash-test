import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ToggleButtonGroup,
  ToggleButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { PlayArrow, Pause, Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
import { Formik, Form, Field, FieldArray} from 'formik';
import * as Yup from 'yup';
import { getCampaigns, createCampaign, updateCampaignStatus } from '../services/campaignApi';
import { Campaign, CreateCampaignData, UpdateCampaignStatusData, CampaignFilters, Country, CampaignPayout } from '../types/campaign';
import { Layout } from '../components/Layout';

const countries: Country[] = ['Estonia', 'Spain', 'Bulgaria'];

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  payouts: Yup.array().of(
    Yup.object().shape({
      country: Yup.string().oneOf(countries).required('Country is required'),
      amount: Yup.number().required('Amount is required').min(0, 'Amount must be positive'),
    })
  ).min(1, 'At least one payout is required'),
});

type StatusFilter = 'all' | 'active' | 'paused';

interface FormikPayoutErrors {
  country?: string;
  amount?: string;
}

export const Campaigns: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [filters, setFilters] = useState<CampaignFilters>({
    search: '',
    is_active: undefined,
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const campaigns = await getCampaigns(filters);
      setCampaigns(campaigns);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, [filters]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, search: event.target.value }));
  };

  const handleStatusFilterChange = (_event: React.MouseEvent<HTMLElement>, newValue: StatusFilter) => {
    const is_active = newValue === 'all' ? undefined : newValue === 'active';
    setFilters(prev => ({ ...prev, is_active }));
  };

  const handleCreateCampaign = async (values: CreateCampaignData) => {
    try {
      await createCampaign(values);
      setOpenDialog(false);
      fetchCampaigns();
    } catch (error) {
      console.error('Error creating campaign:', error);
    }
  };

  const handleUpdateStatus = async (campaignId: number, is_active: boolean) => {
    try {
      const data: UpdateCampaignStatusData = { is_active };
      await updateCampaignStatus(campaignId, data);
      fetchCampaigns();
    } catch (error) {
      console.error('Error updating campaign status:', error);
    }
  };

  const initialValues: CreateCampaignData = {
    title: '',
    payouts: [
      { country: 'Estonia' as Country, amount: 0 },
      { country: 'Spain' as Country, amount: 0 },
      { country: 'Bulgaria' as Country, amount: 0 }
    ],
  };

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, minHeight: '100vh', py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1">
            Campaigns
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
          >
            Create Campaign
          </Button>
        </Box>

        <Paper sx={{ p: 2, mb: 4 }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField
              label="Search Campaigns"
              variant="outlined"
              size="small"
              value={filters.search}
              onChange={handleSearchChange}
              sx={{ flexGrow: 1 }}
            />
            <ToggleButtonGroup
              value={filters.is_active === undefined ? 'all' : filters.is_active ? 'active' : 'paused'}
              exclusive
              onChange={handleStatusFilterChange}
              aria-label="campaign status"
            >
              <ToggleButton value="all" aria-label="all">
                All
              </ToggleButton>
              <ToggleButton value="active" aria-label="active">
                Active
              </ToggleButton>
              <ToggleButton value="paused" aria-label="paused">
                Paused
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Paper>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Payouts</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {campaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell>{campaign.title}</TableCell>
                  <TableCell>
                    <Typography color={campaign.is_active ? 'success.main' : 'text.secondary'}>
                      {campaign.is_active ? 'Active' : 'Paused'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {campaign.payouts.map((payout) => (
                      <Typography key={payout.country}>
                        {payout.country}: €{payout.amount}
                      </Typography>
                    ))}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color={campaign.is_active ? 'success' : 'default'}
                      onClick={() => handleUpdateStatus(campaign.id, !campaign.is_active)}
                    >
                      {campaign.is_active ? <Pause /> : <PlayArrow />}
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Create New Campaign</DialogTitle>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleCreateCampaign}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form>
                <DialogContent>
                  <TextField
                    fullWidth
                    name="title"
                    label="Campaign Title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.title && Boolean(errors.title)}
                    helperText={touched.title && errors.title}
                    margin="normal"
                  />
                  <FieldArray name="payouts">
                    {({  }) => (
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="h6" gutterBottom>
                          Payouts
                        </Typography>
                        {(values.payouts as CampaignPayout[]).map((payout, index) => (
                          <Box key={index} sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
                            <Typography sx={{ minWidth: 100 }}>
                              {payout.country}:
                            </Typography>
                            <Field
                              as={TextField}
                              fullWidth
                              type="number"
                              name={`payouts.${index}.amount`}
                              label="Amount (€)"
                              value={payout.amount}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched.payouts?.[index]?.amount &&
                                Boolean((errors.payouts?.[index] as FormikPayoutErrors)?.amount)
                              }
                              helperText={
                                touched.payouts?.[index]?.amount &&
                                (errors.payouts?.[index] as FormikPayoutErrors)?.amount
                              }
                            />
                          </Box>
                        ))}
                      </Box>
                    )}
                  </FieldArray>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                  <Button type="submit" variant="contained" color="primary">
                    Create
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </Dialog>
      </Container>
    </Layout>
  );
};

export default Campaigns; 