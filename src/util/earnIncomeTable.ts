import { ProficiencyLevel } from "./proficiency";

interface TaskLevel {
	dc: number,
	failure: number,
	success: Map<ProficiencyLevel, number> // in copper pieces
}

const makeTaskLevel = (dc: number, failure: number, trained: number, expert: number, master: number, legendary: number): TaskLevel => ({
	dc: dc,
	failure: failure,
	success: new Map([
		[ProficiencyLevel.Trained,   trained],
		[ProficiencyLevel.Expert,    expert],
		[ProficiencyLevel.Master,    master],
		[ProficiencyLevel.Legendary, legendary],
	])
});

const earnIncomeTable: TaskLevel[] = [
	makeTaskLevel(14, 1,   5,    5,    5,     5    ),
	makeTaskLevel(15, 2,   20,   20,   20,    20   ),
	makeTaskLevel(16, 4,   30,   30,   30,    30   ),
	makeTaskLevel(18, 8,   50,   50,   50,    50   ),
	makeTaskLevel(19, 10,  70,   80,   80,    80   ),
	makeTaskLevel(20, 20,  90,   100,  100,   100  ),
	makeTaskLevel(22, 30,  150,  200,  200,   200  ),
	makeTaskLevel(23, 40,  200,  250,  250,   250  ),
	makeTaskLevel(24, 50,  250,  300,  300,   300  ),
	makeTaskLevel(26, 60,  300,  400,  400,   400  ),
	makeTaskLevel(27, 70,  400,  500,  600,   600  ),
	makeTaskLevel(28, 80,  500,  600,  800,   800  ),
	makeTaskLevel(30, 90,  600,  800,  1000,  1000 ),
	makeTaskLevel(31, 100, 700,  1000, 1500,  1500 ),
	makeTaskLevel(32, 150, 800,  1500, 2000,  2000 ),
	makeTaskLevel(34, 200, 1000, 2000, 2800,  2800 ),
	makeTaskLevel(35, 250, 1300, 2500, 3600,  4000 ),
	makeTaskLevel(36, 300, 1500, 3000, 4500,  5500 ),
	makeTaskLevel(38, 400, 2000, 4500, 7000,  9000 ),
	makeTaskLevel(39, 600, 3000, 6000, 10000, 13000),
	makeTaskLevel(40, 800, 4000, 7500, 15000, 20000),
	makeTaskLevel(42, 0,   5000, 9000, 17500, 30000),
];

export default earnIncomeTable
