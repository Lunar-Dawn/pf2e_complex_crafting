import { ProficiencyLevel } from "./proficiency";

interface TaskLevel {
	dc: number,
	failure: number,
	success: Map<ProficiencyLevel, number>
}
interface EarnIncomeTable {
	levels: TaskLevel[]
}

// Make the table at least vaguely readable
import prof = ProficiencyLevel

const earnIncomeTable: EarnIncomeTable = {
	levels: [
		{ dc: 14, failure: 1,   success: new Map([[prof.Trained, 5   ], [prof.Expert, 5   ], [prof.Master, 5    ], [prof.Legendary, 5     ]]) },
		{ dc: 15, failure: 2,   success: new Map([[prof.Trained, 20  ], [prof.Expert, 20  ], [prof.Master, 20   ], [prof.Legendary, 20    ]]) },
		{ dc: 16, failure: 4,   success: new Map([[prof.Trained, 30  ], [prof.Expert, 30  ], [prof.Master, 30   ], [prof.Legendary, 30    ]]) },
		{ dc: 18, failure: 8,   success: new Map([[prof.Trained, 50  ], [prof.Expert, 50  ], [prof.Master, 50   ], [prof.Legendary, 50    ]]) },
		{ dc: 19, failure: 10,  success: new Map([[prof.Trained, 70  ], [prof.Expert, 80  ], [prof.Master, 80   ], [prof.Legendary, 80    ]]) },
		{ dc: 20, failure: 20,  success: new Map([[prof.Trained, 90  ], [prof.Expert, 100 ], [prof.Master, 100  ], [prof.Legendary, 100   ]]) },
		{ dc: 22, failure: 30,  success: new Map([[prof.Trained, 150 ], [prof.Expert, 200 ], [prof.Master, 200  ], [prof.Legendary, 200   ]]) },
		{ dc: 23, failure: 40,  success: new Map([[prof.Trained, 200 ], [prof.Expert, 250 ], [prof.Master, 250  ], [prof.Legendary, 250   ]]) },
		{ dc: 24, failure: 50,  success: new Map([[prof.Trained, 250 ], [prof.Expert, 300 ], [prof.Master, 300  ], [prof.Legendary, 300   ]]) },
		{ dc: 26, failure: 60,  success: new Map([[prof.Trained, 300 ], [prof.Expert, 400 ], [prof.Master, 400  ], [prof.Legendary, 400   ]]) },
		{ dc: 27, failure: 70,  success: new Map([[prof.Trained, 400 ], [prof.Expert, 500 ], [prof.Master, 600  ], [prof.Legendary, 600   ]]) },
		{ dc: 28, failure: 80,  success: new Map([[prof.Trained, 500 ], [prof.Expert, 600 ], [prof.Master, 800  ], [prof.Legendary, 800   ]]) },
		{ dc: 30, failure: 90,  success: new Map([[prof.Trained, 600 ], [prof.Expert, 800 ], [prof.Master, 1000 ], [prof.Legendary, 1000  ]]) },
		{ dc: 31, failure: 100, success: new Map([[prof.Trained, 700 ], [prof.Expert, 1000], [prof.Master, 1500 ], [prof.Legendary, 1500  ]]) },
		{ dc: 32, failure: 150, success: new Map([[prof.Trained, 800 ], [prof.Expert, 1500], [prof.Master, 2000 ], [prof.Legendary, 2000  ]]) },
		{ dc: 34, failure: 200, success: new Map([[prof.Trained, 1000], [prof.Expert, 2000], [prof.Master, 2800 ], [prof.Legendary, 2800  ]]) },
		{ dc: 35, failure: 250, success: new Map([[prof.Trained, 1300], [prof.Expert, 2500], [prof.Master, 3600 ], [prof.Legendary, 4000  ]]) },
		{ dc: 36, failure: 300, success: new Map([[prof.Trained, 1500], [prof.Expert, 3000], [prof.Master, 4500 ], [prof.Legendary, 5500  ]]) },
		{ dc: 38, failure: 400, success: new Map([[prof.Trained, 2000], [prof.Expert, 4500], [prof.Master, 7000 ], [prof.Legendary, 9000  ]]) },
		{ dc: 39, failure: 600, success: new Map([[prof.Trained, 3000], [prof.Expert, 6000], [prof.Master, 10000], [prof.Legendary, 13000 ]]) },
		{ dc: 40, failure: 800, success: new Map([[prof.Trained, 4000], [prof.Expert, 7500], [prof.Master, 15000], [prof.Legendary, 20000 ]]) },
		{ dc: 42, failure: 0,   success: new Map([[prof.Trained, 5000], [prof.Expert, 9000], [prof.Master, 17500], [prof.Legendary, 30000 ]]) },
	]
}
export default earnIncomeTable
