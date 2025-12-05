'use client';

import { useEffect, useState } from 'react';

interface ReviewItem {
  registration_id: string;
  student_name: string;
  student_email: string;
  event_name: string;
  major_program: string;
  grad_year: string;
  interests: string;
  needs_review: string;
  approved: string;
  review_notes: string;
  reviewed_at: string;
  processed: string;
}

export default function ReviewQueuePage() {
  const [reviewItems, setReviewItems] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => {
    fetchReviewQueue();
  }, []);

  const fetchReviewQueue = async () => {
    try {
      const response = await fetch('/api/review-queue');
      const data = await response.json();

      if (data.success) {
        // Use reviewQueue from GA_Review_Queue sheet
        setReviewItems(data.data.reviewQueue || []);
      }
    } catch (error) {
      console.error('Error fetching review queue:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (registrationId: string, approved: boolean) => {
    setProcessingId(registrationId);

    try {
      const response = await fetch('/api/review-queue/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          registration_id: registrationId,
          approved,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Update the local state
        setReviewItems((prevItems) =>
          prevItems.map((item) =>
            item.registration_id === registrationId
              ? { ...item, approved: approved ? 'TRUE' : 'FALSE' }
              : item
          )
        );
      } else {
        alert('Failed to update approval status');
      }
    } catch (error) {
      console.error('Error updating approval:', error);
      alert('An error occurred while updating approval status');
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white text-xl">Loading review queue...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-aggie-maroon to-aggie-dark_maroon rounded-xl shadow-lg p-8 mt-6">
        <h1 className="text-3xl font-bold text-white">GA Review Queue</h1>
        <p className="text-aggie-gray-light mt-2">
          Review and approve student registrations
        </p>
      </div>

      {/* Review Queue List */}
      {reviewItems.length === 0 ? (
        <div className="rounded-xl border border-white/20 bg-white/10 backdrop-blur-md shadow-lg p-16 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-5xl">✅</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">
              No Pending Reviews
            </h2>
            <p className="text-[#b0b0b0] text-lg">
              All registrations have been reviewed. Check back later for new submissions.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">
              Pending Registrations ({reviewItems.length})
            </h2>
          </div>

          {reviewItems.map((item) => (
            <div
              key={item.registration_id}
              className="rounded-xl border border-white/20 bg-white/5 backdrop-blur-md shadow-lg p-6 hover:bg-white/10 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {item.student_name}
                  </h3>
                  <div className="space-y-1 text-sm text-[#b0b0b0]">
                    <p className="flex items-center gap-2">
                      <span className="text-[#D6D3C4]">📧</span>
                      <span className="font-medium text-[#d1d1d1]">Email:</span>
                      {item.student_email}
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-[#D6D3C4]">📅</span>
                      <span className="font-medium text-[#d1d1d1]">Event:</span>
                      {item.event_name}
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-[#D6D3C4]">🔖</span>
                      <span className="font-medium text-[#d1d1d1]">
                        Registration ID:
                      </span>
                      {item.registration_id}
                    </p>
                  </div>
                </div>

                <div className="ml-6 flex items-center gap-3">
                  {item.approved === '' || item.approved === undefined ? (
                    <>
                      <button
                        onClick={() =>
                          handleApproval(item.registration_id, true)
                        }
                        disabled={processingId === item.registration_id}
                        className="px-6 py-3 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-emerald-500/50"
                      >
                        {processingId === item.registration_id
                          ? 'Processing...'
                          : '✓ Approve'}
                      </button>
                      <button
                        onClick={() =>
                          handleApproval(item.registration_id, false)
                        }
                        disabled={processingId === item.registration_id}
                        className="px-6 py-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-red-500/50"
                      >
                        {processingId === item.registration_id
                          ? 'Processing...'
                          : '✗ Reject'}
                      </button>
                    </>
                  ) : item.approved === 'TRUE' ? (
                    <div className="px-6 py-3 rounded-lg bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-400/40">
                      ✓ Approved
                    </div>
                  ) : (
                    <div className="px-6 py-3 rounded-lg bg-red-500/20 text-red-300 font-semibold border border-red-400/40">
                      ✗ Rejected
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
