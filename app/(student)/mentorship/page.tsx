'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface UserData {
  userId: string;
  email: string;
  name: string;
  major_program?: string;
  grad_year?: string;
  role: string;
}

interface MentorshipRequest {
  request_id: string;
  student_email: string;
  interest_industry: string;
  career_goal: string;
  matched_mentor_id: string;
  status: string;
  suggested_mentor: string;
  created_at: string;
}

export default function MentorshipPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [mentorshipRequest, setMentorshipRequest] = useState<MentorshipRequest | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/');
      return;
    }

    const parsedUser: UserData = JSON.parse(userData);
    setUser(parsedUser);

    const fetchMentorship = async () => {
      try {
        const res = await fetch(
          `/api/mentorship-status?email=${encodeURIComponent(parsedUser.email)}`
        );
        const data = await res.json();

        if (data.success && data.data) {
          // ✅ we have a row in Mentorship_Requests
          setMentorshipRequest(data.data as MentorshipRequest);
        } else {
          // ❌ no mentorship row for this student
          setMentorshipRequest(null);
        }
      } catch (err) {
        console.error('Error fetching mentorship status:', err);
        setMentorshipRequest(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMentorship();
  }, [router]);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white text-xl">Loading mentorship...</div>
      </div>
    );
  }

  const hasMentorshipRequest = !!mentorshipRequest;

  // Text to show as “preferences”
  const preferences =
    mentorshipRequest?.career_goal?.trim() ||
    mentorshipRequest?.interest_industry?.trim() ||
    'Not specified yet';

  return (
    <div className="space-y-8">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-aggie-maroon to-aggie-dark_maroon rounded-xl shadow-lg p-8 mt-6">
        <h1 className="text-3xl font-bold text-white">Mentorship</h1>
        <p className="text-aggie-gray-light mt-2">
          Connect with experienced mentors in your field
        </p>
      </div>

      {/* IF no mentorship data → only What to Expect (full width)
          ELSE → show live request + What to Expect */}
      {!hasMentorshipRequest ? (
        // --------- NO MENTORSHIP ROW: only What to Expect + CTA ----------
        <div className="rounded-xl p-8 border border-white/20 bg-white/5 backdrop-blur-md shadow-[0_18px_45px_rgba(0,0,0,0.6)]">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">💡</span>
            What to Expect
          </h2>

          <p className="text-[#d0d0d0] mb-6">
            You haven&apos;t requested a mentor yet. When you register for events and
            choose mentorship, we&apos;ll create a mentorship request for you and show
            its status here.
          </p>

          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-3 p-4 rounded-lg bg-white/8 border border-white/15">
              <div className="w-6 h-6 bg-aggie-maroon rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">✓</span>
              </div>
              <span className="text-[#e0e0e0] font-medium">
                We&apos;ll review your preferences and match you with a suitable mentor
              </span>
            </li>
            <li className="flex items-start gap-3 p-4 rounded-lg bg-white/8 border border-white/15">
              <div className="w-6 h-6 bg-aggie-maroon rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">✓</span>
              </div>
              <span className="text-[#e0e0e0] font-medium">
                You&apos;ll receive an email introduction once matched
              </span>
            </li>
            <li className="flex items-start gap-3 p-4 rounded-lg bg-white/8 border border-white/15">
              <div className="w-6 h-6 bg-aggie-maroon rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">✓</span>
              </div>
              <span className="text-[#e0e0e0] font-medium">
                Typical matching time is 1–2 weeks
              </span>
            </li>
          </ul>

          <a
            href="/events"
            className="inline-block px-8 py-3 bg-aggie-maroon text-white rounded-xl hover:bg-aggie-dark_maroon font-semibold transition-all duration-200 shadow-[0_10px_30px_rgba(0,0,0,0.7)] hover:shadow-[0_14px_40px_rgba(0,0,0,0.9)] active:scale-[0.97] active:translate-y-[1px]"
          >
            Browse Events & Request Mentorship
          </a>
        </div>
      ) : (
        // --------- ELSE: WE HAVE MENTORSHIP DATA → show live request + What to Expect ----------
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Mentorship request status - live data card */}
          <div className="rounded-xl p-8 border border-white/20 bg-white/5 backdrop-blur-md shadow-[0_18px_45px_rgba(0,0,0,0.6)]">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-2xl">📋</span>
              Your Mentorship Request
            </h2>
            <div className="space-y-5">
              <div className="p-4 rounded-lg bg-white/8">
                <p className="text-xs font-semibold text-[#9a9a9a] uppercase tracking-wide mb-1">
                  Request ID
                </p>
                <p className="font-bold text-white text-lg">
                  {mentorshipRequest?.request_id}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/8">
                <p className="text-xs font-semibold text-[#9a9a9a] uppercase tracking-wide mb-1">
                  Preferences
                </p>
                <p className="font-semibold text-[#e0e0e0]">{preferences}</p>
              </div>

              {mentorshipRequest?.suggested_mentor && (
                <div className="p-4 rounded-lg bg-white/8">
                  <p className="text-xs font-semibold text-[#9a9a9a] uppercase tracking-wide mb-1">
                    Suggested Mentor
                  </p>
                  <p className="font-semibold text-[#e0e0e0]">
                    {mentorshipRequest.suggested_mentor}
                  </p>
                </div>
              )}

              <div className="p-4 rounded-lg bg-white/8">
                <p className="text-xs font-semibold text-[#9a9a9a] uppercase tracking-wide mb-2">
                  Status
                </p>
                <span
                  className={`inline-block px-4 py-2 text-sm font-semibold rounded-full border ${
                    mentorshipRequest?.status === 'Matched'
                      ? 'bg-emerald-500/15 text-emerald-200 border-emerald-400/50'
                      : mentorshipRequest?.status === 'Pending'
                      ? 'bg-amber-500/15 text-amber-200 border-amber-400/50'
                      : 'bg-white/10 text-[#d0d0d0] border-white/30'
                  }`}
                >
                  {mentorshipRequest?.status || 'Pending'}
                </span>
              </div>
            </div>
          </div>

          {/* What to Expect - side card */}
          <div className="rounded-xl p-8 border border-white/20 bg-white/5 backdrop-blur-md shadow-[0_18px_45px_rgba(0,0,0,0.6)]">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-2xl">💡</span>
              What to Expect
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 p-4 rounded-lg bg-white/8 border border-white/15">
                <div className="w-6 h-6 bg-aggie-maroon rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-[#e0e0e0] font-medium">
                  We&apos;ll review your preferences and match you with a suitable mentor
                </span>
              </li>
              <li className="flex items-start gap-3 p-4 rounded-lg bg-white/8 border border-white/15">
                <div className="w-6 h-6 bg-aggie-maroon rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-[#e0e0e0] font-medium">
                  You&apos;ll receive an email introduction once matched
                </span>
              </li>
              <li className="flex items-start gap-3 p-4 rounded-lg bg-white/8 border border-white/15">
                <div className="w-6 h-6 bg-aggie-maroon rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-[#e0e0e0] font-medium">
                  Typical matching time is 1–2 weeks
                </span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
