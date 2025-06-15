"use client";

import Sidebar from "@/components/Sidebar";
import Image from "next/image";
const playlists = [
  {
    title: "Why Your Organization Needs a CPR Trainer",
    description: "HSI Adult First Aid Complete Class (2020) v1.0",
    videoId: "g7wMAg5Umho",
    url: "https://www.youtube.com/watch?v=g7wMAg5Umho&list=PL82rIucEVvOqNvao2Qhs6gXiwhoyk7Uy2",
  },
  {
    title: "Why Should You Take CPR, AED, and First Aid Training",
    description: "Combined First Aid and CPR AED instruction",
    videoId: "IMjV-8TmmZI",
    url: "https://www.youtube.com/watch?v=IMjV-8TmmZI&list=PL82rIucEVvOp_wD47IvzZKFmCXZ9VWrmQ",
  },
  {
    title: "Why Teach ASHI, MEDIC First Aid Hands-On Training",
    description: "Full Combo Class for First Aid and CPR",
    videoId: "peo4wt5Z_8Q",
    url: "https://www.youtube.com/watch?v=peo4wt5Z_8Q&list=PL82rIucEVvOrDee2PMEOIqgcjpIJnmW1a",
  },
];

export default function VideoPlayerPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-50">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Video Playlist
        </h1>

        <div className="flex flex-wrap gap-6">
          {playlists.map((playlist, index) => (
            <div
              key={index}
              className="w-full md:w-[30%] bg-white border rounded shadow hover:shadow-md transition"
            >
              <img
                src={`https://img.youtube.com/vi/${playlist.videoId}/hqdefault.jpg`}
                alt={playlist.title}
                className="w-full h-48 object-cover rounded-t"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {playlist.title}
                </h2>
                <p className="text-sm text-gray-600 mt-1 mb-4">
                  {playlist.description}
                </p>
                <a
                  href={playlist.url}
                  target="_blank"
                  className="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 inline-block"
                >
                  ▶ Play
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
