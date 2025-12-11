"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";

interface Video {
  id: string;
  videoId: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  order: number;
}

export default function VideoPlayerPage() {
  const router = useRouter();
  const [videos, setVideos] = useState<Video[]>([]);
  const [userRole, setUserRole] = useState<string>("");
  const [loading, setLoading] = useState(true);

  // Auth check and fetch videos based on user's purchased courses
  useEffect(() => {
    const userStr = localStorage.getItem("currentUser");
    if (!userStr) {
      router.replace("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const user = JSON.parse(userStr);
        const userId = user.id || user.username;
        const role = user.role;
        setUserRole(role);

        // Fetch videos
        const videosResponse = await fetch(
          `/api/videos?userId=${userId}&role=${role}&t=${Date.now()}`,
          {
            cache: "no-store",
          }
        );

        if (videosResponse.ok) {
          const videosData = await videosResponse.json();
          console.log("Videos fetched:", videosData);
          setVideos(videosData);
        } else {
          const error = await videosResponse.json();
          console.error("Failed to fetch videos:", videosResponse.status, error);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 lg:ml-0">
        {/* Professional Header */}
        <div className="bg-gradient-to-r from-[#1E90FF] to-[#5DCCDB] text-white px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 shadow-lg mt-16 lg:mt-0">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3">Training Video Library</h1>
            <p className="text-base sm:text-lg text-white/90">Access your professional training content</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#5DCCDB] border-t-transparent"></div>
              <p className="mt-4 text-gray-600 text-lg">Loading your training videos...</p>
            </div>
          ) : videos.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-white border-2 border-gray-200 rounded-xl p-10 max-w-lg mx-auto shadow-sm">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">No Videos Available</h3>
                <p className="text-gray-600">
                  {userRole === "instructor"
                    ? "You don't have access to training videos yet. Contact your administrator to get started with course credits."
                    : "No training videos are currently available. Please contact support for assistance."}
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Video Count */}
              <div className="mb-8">
                <p className="text-gray-600">
                  Showing <span className="font-semibold text-gray-800">{videos.length}</span> training {videos.length === 1 ? 'video' : 'videos'}
                </p>
              </div>

              {/* Professional Video Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {videos.map((video) => (
                  <div
                    key={video.id}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
                  >
                    {/* Thumbnail with Play Overlay */}
                    <div className="relative overflow-hidden">
                      <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-[#1E90FF] ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Video Info */}
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                        {video.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {video.description}
                      </p>

                      {/* Watch Button */}
                      <a
                        href={video.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#1E90FF] to-[#5DCCDB] text-white px-5 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow duration-300"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                        Watch Video
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
