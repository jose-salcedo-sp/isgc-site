interface GradedCourse {
  credits: number;
  grade: number;
}

// Scholaro scale for Mexico: 9–10 → A, 8 → B, 7 → C, 6 → D, below 6 → F.
const gradePoints = (grade: number) => {
  if (grade >= 9) {
    return 4;
  }
  if (grade >= 8) {
    return 3;
  }
  if (grade >= 7) {
    return 2;
  }
  if (grade >= 6) {
    return 1;
  }
  return 0;
};

export const computeGpa = (courses: GradedCourse[]) => {
  let credits = 0;
  let gradeSum = 0;
  let pointSum = 0;
  for (const course of courses) {
    credits += course.credits;
    gradeSum += course.grade * course.credits;
    pointSum += gradePoints(course.grade) * course.credits;
  }
  if (credits === 0) {
    return null;
  }
  return { average: gradeSum / credits, credits, gpa: pointSum / credits };
};
