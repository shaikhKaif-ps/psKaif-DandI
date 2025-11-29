// app/suggested-courses/page.tsx
'use client';

import ResultPage from '@/components/results/ResultPage';
import { useState, useRef, useEffect } from 'react';
import { FaStar, FaRegClock } from 'react-icons/fa';

const tabs = [
  { id: 'results', label: 'Results' },
  { id: 'suggestedCourses', label: 'Suggested Courses' },
  { id: 'advice', label: 'Advice' },
];

const courses = [
  { id: 1, title: 'Ux Design Process Best practice', duration: '10 min', rating: 4.3 },
  { id: 2, title: 'Ux Design Process Best practice', duration: '10 min', rating: 4.3 },
  { id: 3, title: 'Ux Design Process Best practice', duration: '10 min', rating: 4.3 },
  { id: 4, title: 'Ux Design Process Best practice', duration: '10 min', rating: 4.3 },
  { id: 5, title: 'Ux Design Process Best practice', duration: '10 min', rating: 4.3 },
];

export default function SuggestedCourses() {
  const [activeTab, setActiveTab] = useState('suggestedCourses');
  const [highlightStyle, setHighlightStyle] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Update highlight position on tab change
  useEffect(() => {
    const index = tabs.findIndex((t) => t.id === activeTab);
    const el = tabRefs.current[index];
    if (el) {
      setHighlightStyle({
        left: el.offsetLeft,
        width: el.offsetWidth,
      });
    }
  }, [activeTab]);

  return (
    <div className="w-full min-h-screen bg-white md:px-4 sm:px-8 py-6">
      {/* Tabs */}
      <div className="relative flex rounded-full border border-gray-300 bg-gray-100 p-1 mb-6 max-w-fit">
        {/* Moving Highlight */}
        <div
          className="absolute top-1 bottom-1 rounded-full bg-[#5A0C0C] transition-all duration-300 ease-in-out"
          style={{
            left: highlightStyle.left,
            width: highlightStyle.width,
          }}
        />
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            onClick={() => setActiveTab(tab.id)}
            className={`cursor-pointer relative z-1 rounded-full px-4 py-2 text-sm md:text-base font-medium transition-colors duration-300 ${
              activeTab === tab.id ? 'text-white' : 'text-gray-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid of Courses */}
      {activeTab === 'suggestedCourses' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {courses.map((course) => (
            <div
              key={course.id}
              className="p-3 max-h-[302px] h-[302px] border border-[#D0D5DD] rounded-lg shadow-sm hover:shadow-md transition bg-white flex flex-col"
            >
              {/* Thumbnail */}
              <div className="bg-[#542E2E] h-[180px] w-full rounded-lg flex items-center justify-center text-white">
                <span className="text-sm">▶</span>
              </div>

              {/* Content */}
              <div className="py-3 space-y-2 flex flex-col gap-2 flex-1 justify-between">
                <p className="font-bold text-sm text-gray-800 w-[70%]">{course.title}</p>

                {/* Duration + Rating */}
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span className="flex items-center gap-1 bg-[#543434] text-white px-2 py-2 rounded-[5px]">
                    <FaRegClock className="text-[12px]" /> {course.duration}
                  </span>
                  <span className="flex items-center gap-1 text-yellow-500">
                    <FaStar className="text-[12px]" />
                    <span className="text-black text-base">{course.rating}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'results' && (
        // <div className="text-gray-600 text-center mt-10">📊 Results content goes here</div>
        <div className="text-gray-600 text-center ">
          <ResultPage />
        </div>
      )}
      {activeTab === 'advice' && (
        <div className="text-gray-600 text-center mt-10">💡 Advice content goes here</div>
      )}
    </div>
  );
}
