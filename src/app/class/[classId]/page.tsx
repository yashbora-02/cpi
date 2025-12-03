'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

interface DigitalCardStudent {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  certificate_url: string | null;
}

interface DigitalCardDetails {
  id: number;
  class_id: string;
  program: string;
  site: string;
  class_type: string;
  start_date: string;
  end_date: string;
  accrediting_instructor: string;
  assisting_instructor: string | null;
  open_enrollment: boolean;
  is_locked: boolean;
  submitted_at: string | null;
  submitted_by: string | null;
  credits_used: number;
  students: DigitalCardStudent[];
  created_at: string;
  updated_at: string;
}

export default function ClassDetailPage() {
  const params = useParams();
  const router = useRouter();
  const classId = params.classId as string;

  const [classDetails, setClassDetails] = useState<DigitalCardDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Auth check
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace('/login');
      }
    });
    return () => unsubscribe();
  }, [router]);

  // Fetch class details
  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const token = await user.getIdToken();
        const response = await fetch(`/api/digital-cards/${classId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch class details');
        }

        const data = await response.json();
        setClassDetails(data);
      } catch (err) {
        console.error('Error fetching class details:', err);
        setError('Failed to load class details');
      } finally {
        setLoading(false);
      }
    };

    if (classId) {
      fetchClassDetails();
    }
  }, [classId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#C10E21] to-[#00A5A8] text-white px-8 py-6 shadow-lg">
          <h1 className="text-3xl font-bold">Class Details</h1>
          <p className="text-base mt-2 text-white/90">
            Viewing details for {classId}
          </p>
        </div>

        <div className="p-8">
          <div className="max-w-6xl mx-auto">
            {loading && (
              <div className="text-center py-10">
                <p className="text-gray-600">Loading class details...</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {classDetails && (
              <>
                {/* Class Information Card */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
                    Class Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Class ID</label>
                      <p className="text-gray-900 font-semibold">{classDetails.class_id}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Program</label>
                      <p className="text-gray-900">{classDetails.program}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Site</label>
                      <p className="text-gray-900">{classDetails.site}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Class Type</label>
                      <p className="text-gray-900">{classDetails.class_type}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Start Date</label>
                      <p className="text-gray-900">{formatDate(classDetails.start_date)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">End Date</label>
                      <p className="text-gray-900">{formatDate(classDetails.end_date)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Accrediting Instructor</label>
                      <p className="text-gray-900">{classDetails.accrediting_instructor}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Assisting Instructor</label>
                      <p className="text-gray-900">{classDetails.assisting_instructor || 'None'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Credits Used</label>
                      <p className="text-gray-900">{classDetails.credits_used}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Status</label>
                      <p className="text-gray-900">
                        {classDetails.is_locked ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Locked
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Active
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Students List Card */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
                    Enrolled Students ({classDetails.students.length})
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50 border-b">
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                            #
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                            First Name
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                            Last Name
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                            Certificate
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {classDetails.students.map((student, index) => (
                          <tr key={student.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                              {index + 1}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                              {student.first_name}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                              {student.last_name}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                              {student.email}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                              {student.certificate_url ? (
                                <a
                                  href={student.certificate_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:underline"
                                >
                                  View Certificate
                                </a>
                              ) : (
                                <span className="text-gray-400">Not available</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Back Button */}
                <div className="mt-6">
                  <button
                    onClick={() => router.back()}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition"
                  >
                    ← Back
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
