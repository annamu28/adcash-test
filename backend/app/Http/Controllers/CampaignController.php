<?php

namespace App\Http\Controllers;

use App\Models\Campaign;
use App\Models\Payout;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class CampaignController extends Controller
{
    public function index(Request $request)
    {
        try {
            Log::info('Fetching campaigns', ['user_id' => $request->user()->id]);
            
            $query = Campaign::with('payouts')->where('user_id', $request->user()->id);
            
            // Apply filters if provided
            if ($request->has('is_active')) {
                $query->where('is_active', $request->boolean('is_active'));
            }
            
            if ($request->has('search')) {
                $query->where('title', 'like', '%' . $request->search . '%');
            }
            
            $campaigns = $query->orderBy('created_at', 'desc')->get();
            
            Log::info('Campaigns fetched successfully', ['count' => $campaigns->count()]);
            
            return response()->json($campaigns);
        } catch (\Exception $e) {
            Log::error('Failed to fetch campaigns', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'message' => 'Failed to fetch campaigns'
            ], 500);
        }
    }
    
    public function store(Request $request)
    {
        try {
            Log::info('Creating campaign', [
                'user_id' => $request->user()->id,
                'data' => $request->all()
            ]);
            
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'payouts' => 'required|array|min:1',
                'payouts.*.country' => 'required|string|in:Estonia,Spain,Bulgaria',
                'payouts.*.amount' => 'required|numeric|min:0',
            ]);
            
            DB::beginTransaction();
            
            $campaign = Campaign::create([
                'user_id' => $request->user()->id,
                'title' => $validated['title'],
                'is_active' => false
            ]);
            
            foreach ($validated['payouts'] as $payoutData) {
                $campaign->payouts()->create($payoutData);
            }
            
            DB::commit();
            
            Log::info('Campaign created successfully', ['campaign_id' => $campaign->id]);
            
            return response()->json($campaign->load('payouts'), 201);
        } catch (\Exception $e) {
            DB::rollBack();
            
            Log::error('Failed to create campaign', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'message' => 'Failed to create campaign'
            ], 500);
        }
    }
    
    public function updateStatus(Request $request, $id)
    {
        try {
            Log::info('Updating campaign status', [
                'user_id' => $request->user()->id,
                'campaign_id' => $id,
                'data' => $request->all()
            ]);
            
            $validated = $request->validate([
                'is_active' => 'required|boolean',
            ]);
            
            $campaign = Campaign::where('user_id', $request->user()->id)
                ->findOrFail($id);
            
            $campaign->update($validated);
            
            Log::info('Campaign status updated successfully', [
                'campaign_id' => $id,
                'is_active' => $validated['is_active']
            ]);
            
            return response()->json($campaign->load('payouts'));
        } catch (\Exception $e) {
            Log::error('Failed to update campaign status', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'campaign_id' => $id
            ]);
            
            return response()->json([
                'message' => 'Failed to update campaign status'
            ], 500);
        }
    }
} 