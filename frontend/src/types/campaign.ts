export type Country = 'Estonia' | 'Spain' | 'Bulgaria';

export interface CampaignPayout {
  country: Country;
  amount: number;
}

export interface Campaign {
  id: number;
  title: string;
  is_active: boolean;
  payouts: CampaignPayout[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateCampaignData {
  title: string;
  payouts: CampaignPayout[];
}

export interface UpdateCampaignStatusData {
  is_active: boolean;
}

export interface CampaignFilters {
  search?: string;
  is_active?: boolean;
} 