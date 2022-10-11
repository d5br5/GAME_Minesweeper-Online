export const getGrade = (grade: string): string => {
	if (grade === "x") {
		return "🌠🌠🌠🌠🌠";
	} else {
		const floatedGrade = parseFloat(grade);
		if (floatedGrade <= 0.4) {
			return "🌠🌠🌠🌠🌠";
		} else if (floatedGrade <= 1.4) {
			return "⭐🌠🌠🌠🌠";
		} else if (floatedGrade <= 2.4) {
			return "⭐⭐🌠🌠🌠";
		} else if (floatedGrade <= 3.4) {
			return "⭐⭐⭐🌠🌠";
		} else if (floatedGrade <= 4.4) {
			return "⭐⭐⭐⭐🌠";
		} else {
			return "⭐⭐⭐⭐⭐";
		}
	}
};
