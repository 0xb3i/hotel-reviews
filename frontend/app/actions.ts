"use server";

import { loadComments } from "@/lib/server/comments-data";

export async function fetchGlobalStats() {
  const all = loadComments();
  
  const total = all.length;
  
  const avgScore = total ? all.reduce((sum, item) => sum + item.score, 0) / total : 4.8;
  
  const hygieneItems = all.filter(i => i.categories.includes("卫生状况"));
  const hygieneScore = hygieneItems.length ? hygieneItems.reduce((sum, i) => sum + i.score, 0) / hygieneItems.length : avgScore;
  
  const envItems = all.filter(i => i.categories.includes("安静程度") || i.categories.includes("景观/朝向"));
  const environmentScore = envItems.length ? envItems.reduce((sum, i) => sum + i.score, 0) / envItems.length : avgScore;
  
  const facItems = all.filter(i => i.categories.includes("房间设施") || i.categories.includes("公共设施") || i.categories.includes("餐饮设施"));
  const facilityScore = facItems.length ? facItems.reduce((sum, i) => sum + i.score, 0) / facItems.length : avgScore;
  
  const servItems = all.filter(i => i.categories.includes("前台服务") || i.categories.includes("客房服务") || i.categories.includes("退房/入住效率") || i.categories.includes("退房/入住 效率"));
  const serviceScore = servItems.length ? servItems.reduce((sum, i) => sum + i.score, 0) / servItems.length : avgScore;

  // Options
  const roomTypeOptions = Array.from(new Set(all.map(i => i.fuzzy_room_type || i.room_type).filter(Boolean)));
  const travelTypeOptions = Array.from(new Set(all.map(i => i.travel_type).filter(Boolean)));

  // Hot Tags
  const countMap = new Map<string, number>();
  for (const item of all) {
    for (const category of item.categories) {
      if (category) {
        countMap.set(category, (countMap.get(category) ?? 0) + 1);
      }
    }
  }
  const hotTags = Array.from(countMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([name, count]) => ({ name, count }));

  return {
    total,
    avgScore,
    hygieneScore,
    environmentScore,
    facilityScore,
    serviceScore,
    roomTypeOptions,
    travelTypeOptions,
    hotTags
  };
}
