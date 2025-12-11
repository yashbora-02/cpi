/**
 * Course Type Mapping
 * Maps display program names to Firestore courseType values
 */

export const COURSE_TYPE_MAP: Record<string, string> = {
  // Digital Card Programs
  "CPI Adult First Aid (2020)": "CPI-FA-2020",
  "CPI Adult First Aid | CPR AED Adult Infant (2020)": "CPI-FA-CPR-AI-2020",
  "CPI Adult First Aid | CPR AED All Ages (2020)": "CPI-FA-CPR-AA-2020",
  "CPI Basic Life Support (2020)": "CPI-BLS-2020",
  "CPI CPR AED All Ages (2020)": "CPI-CPR-AA-2020",
  "CPI Spanish Adult First Aid | CPR AED All Ages (2020)": "CPI-ES-FA-CPR-2020",

  // Blended Programs
  "CPI Adult First Aid (2020) -(Blended)-DC": "CPI-FA-2020",
  "CPI Adult First Aid | CPR AED Adult Infant (2020) -(Blended)-DC": "CPI-FA-CPR-AI-2020",
  "CPI Adult First Aid | CPR AED All Ages (2020) -(Blended)-DC": "CPI-FA-CPR-AA-2020",
  "CPI Basic Life Support (2020) (Blended)-DC": "CPI-BLS-2020",
  "CPI CPR AED All Ages (2020) -(Blended)-DC": "CPI-CPR-AA-2020",
  "CPI Spanish Adult First Aid | CPR AED All Ages (2020) -(Blended)-DC": "CPI-ES-FA-CPR-2020",
};

/**
 * Get courseType from program name
 */
export function getCourseType(programName: string): string | null {
  return COURSE_TYPE_MAP[programName] || null;
}

/**
 * Get display name from courseType
 */
export function getDisplayName(courseType: string): string {
  const entry = Object.entries(COURSE_TYPE_MAP).find(([_, ct]) => ct === courseType);
  return entry ? entry[0] : courseType;
}
