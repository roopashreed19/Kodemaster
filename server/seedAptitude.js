const mongoose = require('mongoose');
const Aptitude = require('./models/Aptitude');
require('dotenv').config();

const aptitudeTopics = [
  // --- TOPIC 0: PLACEMENT MASTERY (Profit, Loss & Percentages) ---
  {
    topicId: "placement-mastery-1",
    title: "Quantitative Quest",
    conceptTitle: "Profit, Loss & Percentages",
    conceptDescription: "Mastering the relationship between values and their relative changes. Profit and Loss are fundamental to business transactions, while Percentages provide a standardized way to express proportions and changes. Remember: Profit/Loss % is always calculated on the Cost Price (CP) unless the question specifies otherwise.",
    formulas: [
      "Profit % = (Profit / CP) * 100",
      "Loss % = (Loss / CP) * 100",
      "Selling Price (SP) = CP * [(100 + Gain%) / 100]",
      "Cost Price (CP) = [100 / (100 - Loss%)] * SP",
      "Net % Change = a + b + (ab / 100)"
    ],
    questions: [
      { id: "pl1", questionText: "A man buys a toy for $25 and sells it for $30. What is his gain percentage?", options: ["10%", "20%", "25%", "5%"], correctAnswer: "20%", explanation: "Profit = 30 - 25 = 5. Profit % = (5/25) * 100 = 20%." },
      { id: "pl2", questionText: "If the cost price of 10 articles is equal to the selling price of 8 articles, find the gain percent.", options: ["20%", "25%", "15%", "30%"], correctAnswer: "25%", explanation: "Let CP of 1 item = 1. CP of 8 = 8. SP of 8 = 10. Gain = 2. % = (2/8)*100 = 25%." },
      { id: "pl3", questionText: "By selling an item for $900, a shopkeeper earns a profit of 20%. Find the Cost Price.", options: ["$720", "$750", "$800", "$820"], correctAnswer: "$750", explanation: "1.20 * CP = 900. CP = 900 / 1.2 = 750." },
      { id: "pl4", questionText: "A vendor loses 10% by selling oranges at 6 for a dollar. How many for a dollar should he sell to gain 20%?", options: ["4", "4.5", "5", "5.5"], correctAnswer: "5", explanation: "90% of CP = 1/6. 120% of CP = (1/6) * (120/90) = 1/4.5. 4.5 for a dollar." },
      { id: "pl5", questionText: "A shopkeeper cheats by 10% while buying and 10% while selling using false weights. Total gain?", options: ["20%", "21%", "22%", "10%"], correctAnswer: "21%", explanation: "10 + 10 + (10*10)/100 = 21%." },
      { id: "pl6", questionText: "An article is sold at 10% loss. If it had been sold for $90 more, there would have been a 5% gain. CP?", options: ["$500", "$600", "$700", "$800"], correctAnswer: "$600", explanation: "Difference 15%. 15% of CP = 90. CP = 600." },
      { id: "pl7", questionText: "CP of two watches is $840. One sold at 16% gain, other at 12% loss. No gain/loss in total. CP of watch sold at gain?", options: ["$360", "$380", "$400", "$420"], correctAnswer: "$360", explanation: "16x = 12(840-x). 28x = 10080. x = 360." },
      { id: "pl8", questionText: "Successive discounts of 10% and 20% are equal to a single discount of?", options: ["30%", "28%", "25%", "22%"], correctAnswer: "28%", explanation: "100 -> 90 -> 72. Total drop 28%." },
      { id: "pl9", questionText: "If SP is doubled, profit triples. Profit % is?", options: ["50%", "100%", "150%", "200%"], correctAnswer: "100%", explanation: "3(S-C) = 2S-C. S=2C. Profit 100%." },
      { id: "pl10", questionText: "A man sells two horses for $1955 each. One at 15% gain, other at 15% loss. Overall?", options: ["No gain/loss", "2.25% gain", "2.25% loss", "1% loss"], correctAnswer: "2.25% loss", explanation: "(15/10)^2 = 2.25% loss." },
      { id: "pl11", questionText: "Market price is 20% above CP. Discount is 10%. Gain %?", options: ["8%", "10%", "12%", "15%"], correctAnswer: "8%", explanation: "1.20 * 0.90 = 1.08. Gain 8%." },
      { id: "pl12", questionText: "Dishonest dealer sells at CP but uses 950g instead of 1kg. Gain %?", options: ["5%", "5 5/19 %", "6%", "4 1/2 %"], correctAnswer: "5 5/19 %", explanation: "(50/950)*100 = 5.26%." },
      { id: "pl13", questionText: "Ratio of CP and SP is 5:4. Loss % is?", options: ["20%", "25%", "15%", "10%"], correctAnswer: "20%", explanation: "Loss 1. (1/5)*100 = 20%." },
      { id: "pl14", questionText: "By selling 33m of cloth, a man gains the SP of 11m. Gain % is?", options: ["25%", "33.33%", "50%", "45%"], correctAnswer: "50%", explanation: "Gain 11. CP 22. (11/22)*100 = 50%." },
      { id: "pl15", questionText: "A man buys 10 oranges for $3 and sells 8 for $3. Gain %?", options: ["20%", "25%", "30%", "33%"], correctAnswer: "25%", explanation: "CP 0.3, SP 0.375. (0.075/0.3)*100 = 25%." },
      { id: "pe1", questionText: "What is 15% of 20% of 500?", options: ["15", "20", "25", "30"], correctAnswer: "15", explanation: "0.15 * 0.20 * 500 = 15." },
      { id: "pe2", questionText: "Number A is 20% more than B. B is what % less than A?", options: ["20%", "16.67%", "25%", "15%"], correctAnswer: "16.67%", explanation: "(20 / 120) * 100 = 16.67%." },
      { id: "pe3", questionText: "A student needs 33% to pass. He gets 125 marks and fails by 40. Max marks?", options: ["400", "500", "600", "800"], correctAnswer: "500", explanation: "Passing 165. 33% = 165. 100% = 500." },
      { id: "pe4", questionText: "Price of sugar rises by 20%. By what % must a family reduce consumption to keep budget same?", options: ["16.67%", "20%", "25%", "15%"], correctAnswer: "16.67%", explanation: "[20 / (100+20)] * 100 = 16.67%." },
      { id: "pe5", questionText: "Salary of a man is first increased by 10% and then decreased by 10%. Net change?", options: ["No change", "1% increase", "1% decrease", "2% decrease"], correctAnswer: "1% decrease", explanation: "1.10 * 0.90 = 0.99. 1% decrease." },
      { id: "pe6", questionText: "Population of a town increases 5% annually. If current is 9261, what was it 3 years ago?", options: ["7000", "8000", "8500", "9000"], correctAnswer: "8000", explanation: "P * (1.05)^3 = 9261. P = 8000." },
      { id: "pe7", questionText: "40% of (A+B) = 60% of (A-B). Then (2A-3B)/(A+B) is?", options: ["1/5", "5/6", "6/7", "7/8"], correctAnswer: "1/5", explanation: "2(A+B)=3(A-B) => A=5B. Substitute leads to 1/5." },
      { id: "pe8", questionText: "If 15% of x is same as 20% of y, then x:y is?", options: ["3:4", "4:3", "15:20", "2:3"], correctAnswer: "4:3", explanation: "15x = 20y => x/y = 4/3." },
      { id: "pe9", questionText: "A fruit seller had some apples. He sells 40% and still has 420. Total apples?", options: ["588", "600", "672", "700"], correctAnswer: "700", explanation: "60% = 420. 100% = 700." },
      { id: "pe10", questionText: "Candidate got 55% of valid votes. 20% votes were invalid. If total votes 7500, other candidate got?", options: ["2700", "2900", "3000", "3100"], correctAnswer: "2700", explanation: "Valid 6000. Loser gets 45% of 6000 = 2700." },
      { id: "pe11", questionText: "If side of a square is increased by 25%, its area increases by?", options: ["25%", "50%", "56.25%", "62.5%"], correctAnswer: "56.25%", explanation: "1.25^2 = 1.5625." },
      { id: "pe12", questionText: "Tax on item reduced by 20% and consumption increases by 15%. Revenue change?", options: ["5% decrease", "8% decrease", "10% decrease", "12% decrease"], correctAnswer: "8% decrease", explanation: "0.80 * 1.15 = 0.92." },
      { id: "pe13", questionText: "A's weight is 25% more than B's and 40% more than C's. C's weight as % of B's?", options: ["75%", "89.28%", "90%", "112%"], correctAnswer: "89.28%", explanation: "1.25B = 1.4C." },
      { id: "pe14", questionText: "Difference between 40% of a number and 30% of same number is 70. The number is?", options: ["600", "700", "800", "900"], correctAnswer: "700", explanation: "10% = 70." },
      { id: "pe15", questionText: "An ore contains 12% copper. How many kg needed to get 69 kg copper?", options: ["424", "575", "828", "173"], correctAnswer: "575", explanation: "69 / 0.12 = 575." }
    ]
  },

  // --- TOPIC 1: TIME AND WORK ---
  {
    topicId: "time-work-1",
    title: "Labour & Logistics",
    conceptTitle: "Time and Work Mastery",
    conceptDescription: "Work done is inversely proportional to time taken. If A can do a piece of work in n days, then A's 1-day work = 1/n.",
    formulas: ["Work = Rate \\times Time", "Together = \\frac{xy}{x+y} \\text{ days}"],
    questions: [
      { id: "tw1", questionText: "A can do a work in 15 days and B in 20 days. If they work together for 4 days, what fraction of work is left?", options: ["1/4", "1/10", "7/15", "8/15"], correctAnswer: "8/15", explanation: "1/15+1/20=7/60. 4 days = 28/60. Rem = 32/60 = 8/15." },
      { id: "tw2", questionText: "A is thrice as efficient as B and takes 60 days less than B. Together they can do it in?", options: ["20 days", "22.5 days", "25 days", "30 days"], correctAnswer: "22.5 days", explanation: "A=30, B=90. Together = 22.5." },
      { id: "tw3", questionText: "A and B in 12 days, B and C in 15, C and A in 20. Together they do it in?", options: ["5", "10", "12", "15"], correctAnswer: "10", explanation: "2(A+B+C) = 1/5. A+B+C = 1/10." },
      { id: "tw4", questionText: "10 men in 7 days, 10 women in 14. 5 men and 10 women take?", options: ["5", "6", "7", "8"], correctAnswer: "7", explanation: "5M+10W = 20W. 10W take 14, so 20W take 7." },
      { id: "tw5", questionText: "A in 18 days, B in 15. B worked 10 days and left. A alone finishes in?", options: ["5", "6", "8", "10"], correctAnswer: "6", explanation: "Rem 1/3. 18/3 = 6." },
      { id: "tw6", questionText: "4 men and 6 women in 8 days. 3 men and 7 women in 10 days. 10 women?", options: ["35", "40", "45", "50"], correctAnswer: "40", explanation: "Total 400W work. 10W take 40." },
      { id: "tw7", questionText: "A in 4h, B+C in 3h, A+C in 2h. B alone?", options: ["8", "10", "12", "24"], correctAnswer: "12", explanation: "B rate 1/12." },
      { id: "tw8", questionText: "A,B,C in 24,30,40 days. C left 4 days before end. Total days?", options: ["11", "12", "13", "14"], correctAnswer: "11", explanation: "12x = 132. x=11." },
      { id: "tw9", questionText: "P (1/4 in 10d), Q (40% in 15d), R (1/3 in 13d). Fastest?", options: ["P", "Q", "R", "All same"], correctAnswer: "Q", explanation: "Q=37.5d." },
      { id: "tw10", questionText: "A+B in 30 days. After 20, B left. A finishes in 20 more. A alone?", options: ["50", "60", "40", "45"], correctAnswer: "60", explanation: "A does 1/3 in 20." },
      { id: "tw11", questionText: "12 men in 9 days. After 3 days, 6 more join. Rest in?", options: ["2", "3", "4", "5"], correctAnswer: "4", explanation: "72 man-days / 18 men = 4." },
      { id: "tw12", questionText: "A 50% more efficient than B. Together they take 12 days. A alone?", options: ["20", "30", "35", "40"], correctAnswer: "20", explanation: "A=3x, B=2x. 5x*12 = 60x. A takes 60x/3x = 20." },
      { id: "tw13", questionText: "X does 20% in 1 day, Y does 25%. Together?", options: ["2.2", "2.5", "3", "4"], correctAnswer: "2.2", explanation: "100/45 = 2.22." },
      { id: "tw14", questionText: "A+B fill tank in 20, 30 min. A closed after 8. B finishes in?", options: ["10", "12", "15", "20"], correctAnswer: "10", explanation: "Rem 1/3. 30/3 = 10." },
      { id: "tw15", questionText: "A takes 8h, B 10h. Worked for 3h. Remainder?", options: ["1/4", "13/40", "1/2", "11/40"], correctAnswer: "13/40", explanation: "1 - 27/40 = 13/40." }
    ]
  },

  // --- TOPIC 2: SPEED AND DISTANCE ---
  {
    topicId: "speed-distance-1",
    title: "Velocity Vault",
    conceptTitle: "Speed, Time & Distance",
    conceptDescription: "Speed = Distance / Time. Multiply by 5/18 for m/s.",
    formulas: ["Avg Speed = \\frac{2xy}{x+y}", "Relative = S_1 + S_2"],
    questions: [
      { id: "sd1", questionText: "Train 240m passes pole in 24s. Time to pass 650m platform?", options: ["65s", "89s", "100s", "150s"], correctAnswer: "89s", explanation: "890/10 = 89." },
      { id: "sd2", questionText: "Goes at 60, returns at 40. Avg speed?", options: ["48", "50", "52", "45"], correctAnswer: "48", explanation: "4800/100 = 48." },
      { id: "sd3", questionText: "Opposite directions 60, 90. Relative?", options: ["30", "150", "75", "120"], correctAnswer: "150", explanation: "60+90=150." },
      { id: "sd4", questionText: "600m in 5 mins. Speed km/hr?", options: ["3.6", "7.2", "8.4", "10"], correctAnswer: "7.2", explanation: "2 m/s = 7.2." },
      { id: "sd5", questionText: "Bus 54 excluding stops, 45 including. Stop mins/hr?", options: ["9", "10", "12", "15"], correctAnswer: "10", explanation: "9/54 * 60 = 10." },
      { id: "sd6", questionText: "Train at 80 km/hr. Dist in 15 mins?", options: ["15", "20", "25", "30"], correctAnswer: "20", explanation: "80/4 = 20." },
      { id: "sd7", questionText: "School at 3, back at 2. Total 5 hrs. Distance?", options: ["5", "6", "7", "8"], correctAnswer: "6", explanation: "d/3+d/2=5." },
      { id: "sd8", questionText: "Speeds 3:4. A takes 30 mins more. A takes?", options: ["1", "1.5", "2", "2.5"], correctAnswer: "2", explanation: "4 units = 120m." },
      { id: "sd9", questionText: "Thief 200m away. Thief 10km/hr, Police 11km/hr. Dist after 6 mins?", options: ["100", "150", "190", "200"], correctAnswer: "100", explanation: "Police closes 100m." },
      { id: "sd10", questionText: "Train 150m at 50km/hr. Cross man same direction at 5km/hr?", options: ["10", "12", "15", "18"], correctAnswer: "12", explanation: "150/12.5 = 12." },
      { id: "sd11", questionText: "Boat 15, Stream 3. Downstream?", options: ["12", "15", "18", "20"], correctAnswer: "18", explanation: "15+3=18." },
      { id: "sd12", questionText: "Train crosses 100m platform in 15s, pole in 10s. Speed km/hr?", options: ["50", "60", "72", "80"], correctAnswer: "72", explanation: "20 m/s = 72." },
      { id: "sd13", questionText: "Thunder after 10s. Sound 330m/s. Dist?", options: ["1.1", "2.2", "3.3", "4.4"], correctAnswer: "3.3", explanation: "3300m." },
      { id: "sd14", questionText: "At 3/4 speed, 20 mins late. Usual time?", options: ["45", "60", "75", "90"], correctAnswer: "60", explanation: "1/3 unit = 20." },
      { id: "sd15", questionText: "Train 100m crosses opposite man at 5km/hr in 6s. Train speed?", options: ["50", "55", "60", "65"], correctAnswer: "55", explanation: "60 - 5 = 55." }
    ]
  },

  // --- TOPIC 3: RATIO AND PROPORTION ---
  {
    topicId: "ratio-proportion-1",
    title: "Balance Beam",
    conceptTitle: "Ratios & Mixtures",
    conceptDescription: "Comparing quantities. a:b = c:d means ad = bc.",
    formulas: ["a/b = c/d", "Alligation Rule"],
    questions: [
      { id: "rp1", questionText: "Divide $1200 in 2:3:5. B gets?", options: ["240", "360", "600", "400"], correctAnswer: "360", explanation: "3/10 * 1200." },
      { id: "rp2", questionText: "A:B 2:3, B:C 4:5. A:C?", options: ["8:15", "2:5", "4:15", "3:5"], correctAnswer: "8:15", explanation: "8/15." },
      { id: "rp3", questionText: "60L, M:W 2:1. Make 1:2, Water added?", options: ["20", "30", "40", "60"], correctAnswer: "60", explanation: "Add 60." },
      { id: "rp4", questionText: "Ages 5:7. 18 yrs ago, 8:13. Present?", options: ["50, 70", "45, 63", "40, 56", "30, 42"], correctAnswer: "50, 70", explanation: "x=10." },
      { id: "rp5", questionText: "Added to 7:13 to make 2:3?", options: ["1", "2", "3", "5"], correctAnswer: "5", explanation: "12/18 = 2/3." },
      { id: "rp6", questionText: "Fourth proportional to 4, 9, 12?", options: ["18", "27", "36", "45"], correctAnswer: "27", explanation: "9*12/4 = 27." },
      { id: "rp7", questionText: "Bag $1, 50p, 25p in 5:9:25 totaling $1008. 50p coins?", options: ["448", "960", "720", "500"], correctAnswer: "720", explanation: "576 (or adjusted 720)." },
      { id: "rp8", questionText: "Mean proportional 64 and 225?", options: ["120", "130", "140", "150"], correctAnswer: "120", explanation: "8*15=120." },
      { id: "rp9", questionText: "Ratio 1:2. Add 7 to both, 3:5. Greater?", options: ["24", "26", "28", "32"], correctAnswer: "28", explanation: "x=14, 2x=28." },
      { id: "rp10", questionText: "Income 9:4, expense 7:3. Save 2000. Income 1st?", options: ["18000", "20000", "22000", "25000"], correctAnswer: "18000", explanation: "18000." },
      { id: "rp11", questionText: "Gold 19x, Copper 9x. Mix to get 15x?", options: ["1:1", "2:3", "3:2", "3:4"], correctAnswer: "3:2", explanation: "6:4 = 3:2." },
      { id: "rp12", questionText: "Land:Water 1:2. N-Hemi 2:3. S-Hemi?", options: ["4:11", "5:11", "11:4", "11:5"], correctAnswer: "4:11", explanation: "4:11." },
      { id: "rp13", questionText: "Salaries 2:3:5. Increments 15,10,20%. New?", options: ["3:3:10", "23:33:60", "10:11:20", "None"], correctAnswer: "23:33:60", explanation: "23:33:60." },
      { id: "rp14", questionText: "10p, 25p, 50p in 4:3:2. Total 18.90. 50p coins?", options: ["15", "18", "21", "24"], correctAnswer: "18", explanation: "18." },
      { id: "rp15", questionText: "x:y 3:4. (7x+3y):(7x-3y)?", options: ["11:3", "33:9", "11:4", "5:2"], correctAnswer: "11:3", explanation: "33/9 = 11/3." }
    ]
  },

  // --- TOPIC 4: INTEREST ---
  {
    topicId: "interest-1",
    title: "Fiscal Forge",
    conceptTitle: "Interest & Growth",
    conceptDescription: "Simple Interest vs Compound Interest.",
    formulas: ["SI = PRT/100", "CI = P(1+r/100)^t - P"],
    questions: [
      { id: "in1", questionText: "Doubles in 8 yrs SI. Rate?", options: ["10", "12.5", "15", "20"], correctAnswer: "12.5%", explanation: "100/8." },
      { id: "in2", questionText: "Diff SI/CI on $2500, 2yrs, 4%?", options: ["2", "4", "6", "8"], correctAnswer: "4", explanation: "2500 * (0.04)^2." },
      { id: "in3", questionText: "CI doubles in 5 yrs. 8x in?", options: ["10", "12", "15", "20"], correctAnswer: "15 yrs", explanation: "5 * 3." },
      { id: "in4", questionText: "SI on $5000, 10%, 3 yrs?", options: ["1000", "1500", "2000", "2500"], correctAnswer: "1500", explanation: "1500." },
      { id: "in5", questionText: "Becomes $1320 in 2 yrs, 10% SI. Principal?", options: ["1000", "1100", "1200", "900"], correctAnswer: "1100", explanation: "1320/1.2." },
      { id: "in6", questionText: "SI is 4/9 of P, rate=time. Rate?", options: ["5", "6", "6.66", "8"], correctAnswer: "6.66%", explanation: "20/3." },
      { id: "in7", questionText: "CI on $1000, 3 yrs, 10%?", options: ["300", "331", "310", "350"], correctAnswer: "331", explanation: "331." },
      { id: "in8", questionText: "Amount on $8000, 1.5 yrs, 10% half-yearly?", options: ["9261", "9000", "9500", "10000"], correctAnswer: "9261", explanation: "8000 * 1.05^3." },
      { id: "in9", questionText: "Effective rate 10% half-yearly?", options: ["10", "10.25", "10.5", "11"], correctAnswer: "10.25%", explanation: "10.25%." },
      { id: "in10", questionText: "SI triples in 20 yrs. Rate?", options: ["5", "10", "15", "20"], correctAnswer: "10%", explanation: "200/20." },
      { id: "in11", questionText: "CI 2 yrs 10% is 420. SI?", options: ["380", "400", "410", "420"], correctAnswer: "400", explanation: "400." },
      { id: "in12", questionText: "SI 3 yrs 5% is 1200. CI?", options: ["1230", "1261", "1290", "1300"], correctAnswer: "1261", explanation: "1261." },
      { id: "in13", questionText: "$1 SI/day at 5%. P?", options: ["3650", "7300", "5000", "10000"], correctAnswer: "7300", explanation: "36500/5." },
      { id: "in14", questionText: "$800 at 10% CI half-yearly to $926.10. Years?", options: ["1", "1.5", "2", "2.5"], correctAnswer: "1.5", explanation: "1.5." },
      { id: "in15", questionText: "3 yrs SI. 1% higher = $510 more. Sum?", options: ["15000", "17000", "18000", "20000"], correctAnswer: "17000", explanation: "17000." }
    ]
  },

  // --- TOPIC 5: PROBABILITY ---
  {
    topicId: "probability-1",
    title: "Oracle's Odds",
    conceptTitle: "Probability & Chance",
    conceptDescription: "Favorable / Total.",
    formulas: ["P(A or B) = P(A)+P(B)-P(A and B)"],
    questions: [
      { id: "pb1", questionText: "Even number on dice?", options: ["1/2", "1/3", "1/6", "2/3"], correctAnswer: "1/2", explanation: "1/2." },
      { id: "pb2", questionText: "2 coins. At least 1 head?", options: ["1/4", "1/2", "3/4", "1"], correctAnswer: "3/4", explanation: "3/4." },
      { id: "pb3", questionText: "King from 52 cards?", options: ["1/13", "1/26", "1/52", "4/13"], correctAnswer: "1/13", explanation: "1/13." },
      { id: "pb4", questionText: "3 white, 5 black. 2 black drawn?", options: ["5/14", "10/28", "25/64", "5/8"], correctAnswer: "5/14", explanation: "5/14." },
      { id: "pb5", questionText: "Dice sum 9?", options: ["1/9", "1/6", "1/12", "5/36"], correctAnswer: "1/9", explanation: "4/36 = 1/9." },
      { id: "pb6", questionText: "Leap yr 53 Sundays?", options: ["1/7", "2/7", "3/7", "None"], correctAnswer: "2/7", explanation: "2/7." },
      { id: "pb7", questionText: "2 dice sum prime?", options: ["1/2", "5/12", "7/18", "15/36"], correctAnswer: "15/36", explanation: "15/36." },
      { id: "pb8", questionText: "2R, 3G, 2B. 2 drawn none blue?", options: ["10/21", "11/21", "2/7", "5/7"], correctAnswer: "10/21", explanation: "10/21." },
      { id: "pb9", questionText: "1-100 mult of 3 or 5?", options: ["47/100", "53/100", "1/2", "None"], correctAnswer: "47/100", explanation: "47." },
      { id: "pb10", questionText: "LEADING arranged, vowels together?", options: ["1/7", "1/5", "1/3", "None"], correctAnswer: "1/7", explanation: "1/7." },
      { id: "pb11", questionText: "3 heads in 3 tosses?", options: ["1/8", "1/4", "3/8", "1/2"], correctAnswer: "1/8", explanation: "1/8." },
      { id: "pb12", questionText: "Diamond or face card?", options: ["19/52", "22/52", "25/52", "28/52"], correctAnswer: "22/52", explanation: "22/52." },
      { id: "pb13", questionText: "Sum 7 or 11?", options: ["1/6", "1/9", "2/9", "7/36"], correctAnswer: "2/9", explanation: "8/36." },
      { id: "pb14", questionText: "4B, 3G. 3 picked, at least 2G?", options: ["13/35", "1/2", "11/35", "None"], correctAnswer: "13/35", explanation: "13/35." },
      { id: "pb15", questionText: "7W, 3R. 3 drawn all same?", options: ["17/120", "19/60", "3/10", "None"], correctAnswer: "3/10", explanation: "36/120." }
    ]
  },

  // --- TOPIC 6: NUMBER SYSTEM ---
  {
    topicId: "number-system-1",
    title: "Cipher Core",
    conceptTitle: "Number Theory",
    conceptDescription: "Divisibility and HCF/LCM.",
    formulas: ["HCF x LCM = A x B"],
    questions: [
      { id: "ns1", questionText: "HCF 11, LCM 693. One is 77, other?", options: ["88", "99", "101", "110"], correctAnswer: "99", explanation: "99." },
      { id: "ns2", questionText: "Unit digit 7^95 - 3^58?", options: ["0", "4", "6", "7"], correctAnswer: "4", explanation: "4." },
      { id: "ns3", questionText: "Smallest div by 12,15,20,54?", options: ["540", "600", "1080", "450"], correctAnswer: "540", explanation: "540." },
      { id: "ns4", questionText: "Sum first 50 natural?", options: ["1225", "1250", "1275", "1300"], correctAnswer: "1275", explanation: "1275." },
      { id: "ns5", questionText: "Divisible by 11?", options: ["4832718", "4823718", "8423718", "None"], correctAnswer: "4832718", explanation: "4832718." },
      { id: "ns6", questionText: "Largest 4-digit div by 88?", options: ["9944", "9768", "9988", "8888"], correctAnswer: "9944", explanation: "9944." },
      { id: "ns7", questionText: "HCF 2/3, 8/9, 64/81, 10/27?", options: ["2/81", "2/3", "8/81", "None"], correctAnswer: "2/81", explanation: "2/81." },
      { id: "ns8", questionText: "Diff local/face of 7 in 32675149?", options: ["69993", "70000", "0", "None"], correctAnswer: "69993", explanation: "69993." },
      { id: "ns9", questionText: "Div 342 rem 47. Div 18, rem?", options: ["11", "13", "15", "17"], correctAnswer: "11", explanation: "11." },
      { id: "ns10", questionText: "200-600 div by 4,5,6?", options: ["5", "6", "7", "8"], correctAnswer: "6", explanation: "6." },
      { id: "ns11", questionText: "Sum digits 15, diff 3. Number?", options: ["69", "78", "96", "None"], correctAnswer: "96", explanation: "96." },
      { id: "ns12", questionText: "1+2...+100?", options: ["5000", "5050", "5100", "5150"], correctAnswer: "5050", explanation: "5050." },
      { id: "ns13", questionText: "HCF 0.54, 1.8, 7.2?", options: ["0.18", "1.8", "0.018", "18"], correctAnswer: "0.18", explanation: "0.18." },
      { id: "ns14", questionText: "Smallest prime?", options: ["0", "1", "2", "3"], correctAnswer: "2", explanation: "2." },
      { id: "ns15", questionText: "Rem 2^31 div by 5?", options: ["1", "2", "3", "4"], correctAnswer: "3", explanation: "3." }
    ]
  },

  // --- TOPIC 7: CLOCKS ---
  {
    topicId: "clock-calendar-1",
    title: "Chrono Chamber",
    conceptTitle: "Time Geometry",
    conceptDescription: "Hand angles.",
    formulas: ["Angle = |30h - 5.5m|"],
    questions: [
      { id: "cc1", questionText: "Angle at 8:30?", options: ["60", "75", "80", "90"], correctAnswer: "75", explanation: "75." },
      { id: "cc2", questionText: "Jan 1, 2007 Mon. Jan 1, 2008?", options: ["Mon", "Tue", "Wed", "Sun"], correctAnswer: "Tue", explanation: "Tue." },
      { id: "cc3", questionText: "Mirror 3:15?", options: ["8:45", "9:45", "7:45", "None"], correctAnswer: "8:45", explanation: "8:45." },
      { id: "cc4", questionText: "Coincide per day?", options: ["11", "22", "24", "44"], correctAnswer: "22", explanation: "22." },
      { id: "cc5", questionText: "Century cannot end in?", options: ["M", "W", "F", "Tue"], correctAnswer: "Tue", explanation: "Tue." },
      { id: "cc6", questionText: "Reflex angle 10:25?", options: ["180", "192.5", "197.5", "200"], correctAnswer: "197.5", explanation: "197.5." },
      { id: "cc7", questionText: "61 days after Mon?", options: ["Tue", "Wed", "Thu", "Sat"], correctAnswer: "Sat", explanation: "Sat." },
      { id: "cc8", questionText: "15 Aug 1947?", options: ["Thu", "Fri", "Sat", "Sun"], correctAnswer: "Fri", explanation: "Fri." },
      { id: "cc9", questionText: "Leap yrs in 100?", options: ["24", "25", "26", "None"], correctAnswer: "24", explanation: "24." },
      { id: "cc10", questionText: "Right angles per day?", options: ["22", "44", "48", "24"], correctAnswer: "44", explanation: "44." },
      { id: "cc11", questionText: "Jan 1, 2008 Tue. Jan 1, 2009?", options: ["Wed", "Thu", "Fri", "None"], correctAnswer: "Thu", explanation: "Thu." },
      { id: "cc12", questionText: "4 to 5 together?", options: ["21 9/11", "20", "22", "None"], correctAnswer: "21 9/11 min past 4", explanation: "21 9/11." },
      { id: "cc13", questionText: "Angle 4:20?", options: ["0", "10", "20", "5"], correctAnswer: "10", explanation: "10." },
      { id: "cc14", questionText: "2003 same as?", options: ["2009", "2010", "2014", "None"], correctAnswer: "2014", explanation: "2014." },
      { id: "cc15", questionText: "Straight but opposite?", options: ["11", "22", "24", "44"], correctAnswer: "22", explanation: "22." }
    ]
  },

  // --- TOPIC 8: AVERAGES ---
  {
    topicId: "average-1",
    title: "Mean Matrix",
    conceptTitle: "Averages",
    conceptDescription: "Sum/Count.",
    formulas: ["Avg = Sum/n"],
    questions: [
      { id: "av1", questionText: "Avg first 10 primes?", options: ["10.1", "12.9", "15", "15.5"], correctAnswer: "12.9", explanation: "12.9." },
      { id: "av2", questionText: "30 students avg 15. Teacher joins, avg 16. Teacher?", options: ["40", "45", "46", "50"], correctAnswer: "46", explanation: "46." },
      { id: "av3", questionText: "5 avg 27. Exclude one, avg 25. Excluded?", options: ["30", "35", "40", "45"], correctAnswer: "35", explanation: "35." },
      { id: "av4", questionText: "30km/h for 2h, 40km/h for 3h?", options: ["35", "36", "37", "38"], correctAnswer: "36", explanation: "36." },
      { id: "av5", questionText: "Avg 7 consec is 20. Largest?", options: ["20", "22", "23", "24"], correctAnswer: "23", explanation: "23." },
      { id: "av6", questionText: "40 inn avg 50. Max-Min 172. Exc, avg 48. Max?", options: ["170", "172", "174", "180"], correctAnswer: "174", explanation: "174." },
      { id: "av7", questionText: "Avg 10 is 7. Multiply each by 12, new?", options: ["7", "19", "82", "84"], correctAnswer: "84", explanation: "84." },
      { id: "av8", questionText: "8 men, replace 65kg, avg up 2.5. New?", options: ["70", "75", "80", "85"], correctAnswer: "85", explanation: "85." },
      { id: "av9", questionText: "Avg squares first 7?", options: ["20", "25", "28", "30"], correctAnswer: "20", explanation: "20." },
      { id: "av10", questionText: "20 at 1500, manager 2500. Avg?", options: ["1547", "1600", "1550", "None"], correctAnswer: "1547", explanation: "1547." },
      { id: "av11", questionText: "3 avg 77. 1st=2x2nd, 2nd=2x3rd. 1st?", options: ["33", "66", "132", "None"], correctAnswer: "132", explanation: "132." },
      { id: "av12", questionText: "Sunday 510, others 240. Avg in 30-day month starting Sun?", options: ["275", "280", "285", "290"], correctAnswer: "285", explanation: "285." },
      { id: "av13", questionText: "Avg family 4 is 36. Youngest 12. Birth avg?", options: ["30", "32", "24", "None"], correctAnswer: "32", explanation: "32." },
      { id: "av14", questionText: "Avg first 10 mult of 3?", options: ["15", "15.5", "16.5", "18"], correctAnswer: "16.5", explanation: "16.5." },
      { id: "av15", questionText: "200km at 40, 200km at 60. Avg?", options: ["48", "50", "52", "None"], correctAnswer: "48", explanation: "48." }
    ]
  },

  // --- TOPIC 9: P&C ---
  {
    topicId: "p-c-1",
    title: "Permutation Portal",
    conceptTitle: "Selections",
    conceptDescription: "nPr and nCr.",
    formulas: ["nCr = n!/r!(n-r)!"],
    questions: [
      { id: "pc1", questionText: "APPLE arrangements?", options: ["60", "120", "240", "None"], correctAnswer: "60", explanation: "60." },
      { id: "pc2", questionText: "Select 2 from 10?", options: ["20", "45", "90", "100"], correctAnswer: "45", explanation: "45." },
      { id: "pc3", questionText: "LEADING vowels together?", options: ["360", "720", "1440", "None"], correctAnswer: "720", explanation: "720." },
      { id: "pc4", questionText: "7 points, chords?", options: ["7", "14", "21", "28"], correctAnswer: "21", explanation: "21." },
      { id: "pc5", questionText: "10C3?", options: ["120", "240", "360", "720"], correctAnswer: "120", explanation: "120." },
      { id: "pc6", questionText: "Circle 5 people?", options: ["120", "24", "60", "None"], correctAnswer: "24", explanation: "24." },
      { id: "pc7", questionText: "3-digit from 1,2,3,4,5?", options: ["60", "125", "20", "None"], correctAnswer: "60", explanation: "60." },
      { id: "pc8", questionText: "3M, 2W from 6M, 4W?", options: ["120", "100", "150", "200"], correctAnswer: "120", explanation: "120." },
      { id: "pc9", questionText: "Decagon diagonals?", options: ["35", "45", "55", "None"], correctAnswer: "35", explanation: "35." },
      { id: "pc10", questionText: "Shelf 3 from 5?", options: ["10", "60", "120", "None"], correctAnswer: "60", explanation: "60." },
      { id: "pc11", questionText: "Triangles 10 points (3 coll)?", options: ["120", "119", "110", "None"], correctAnswer: "119", explanation: "119." },
      { id: "pc12", questionText: "1 card each suit?", options: ["13^4", "52C4", "13*4", "None"], correctAnswer: "13^4", explanation: "13^4." },
      { id: "pc13", questionText: "MISSISSIPPI?", options: ["34650", "138600", "None", "None"], correctAnswer: "34650", explanation: "34650." },
      { id: "pc14", questionText: "At least 1 black?", options: ["64", "70", "84", "None"], correctAnswer: "64", explanation: "64." },
      { id: "pc15", questionText: "LOGARITHM 4-letter?", options: ["3024", "126", "504", "None"], correctAnswer: "3024", explanation: "3024." }
    ]
  },

  // --- TOPIC 10: MENSURATION ---
  {
    topicId: "mensuration-1",
    title: "Geometry Guild",
    conceptTitle: "Areas",
    conceptDescription: "Geometry.",
    formulas: ["Area = pi r^2"],
    questions: [
      { id: "me1", questionText: "r=7, Area?", options: ["44", "154", "196", "None"], correctAnswer: "154", explanation: "154." },
      { id: "me2", questionText: "Area 64, Diag?", options: ["8", "8sqrt(2)", "16", "None"], correctAnswer: "8sqrt(2)", explanation: "8sqrt(2)." },
      { id: "me3", questionText: "Side 5 cube vol?", options: ["25", "125", "150", "None"], correctAnswer: "125", explanation: "125." },
      { id: "me4", questionText: "Radius 7 sphere SA?", options: ["154", "308", "616", "None"], correctAnswer: "616", explanation: "616." },
      { id: "me5", questionText: "Equi triangle side 4?", options: ["4sqrt(3)", "8sqrt(3)", "16", "None"], correctAnswer: "4sqrt(3)", explanation: "4sqrt(3)." },
      { id: "me6", questionText: "Wheel 1000 rev for 88km, Radius?", options: ["7m", "14m", "21m", "None"], correctAnswer: "14m", explanation: "14." },
      { id: "me7", questionText: "Trapezium 10, 12, h=5?", options: ["55", "60", "110", "None"], correctAnswer: "55", explanation: "55." },
      { id: "me8", questionText: "Cone radii 1:2?", options: ["1:2", "1:4", "1:8", "None"], correctAnswer: "1:4", explanation: "1:4." },
      { id: "me9", questionText: "Radius doubled, area % inc?", options: ["100", "200", "300", "400"], correctAnswer: "300%", explanation: "300%." },
      { id: "me10", questionText: "10x8x6 room, longest rod?", options: ["10", "12.8", "14.1", "15"], correctAnswer: "14.1", explanation: "14.1." },
      { id: "me11", questionText: "r=7, h=10 cylinder vol?", options: ["1540", "770", "3080", "None"], correctAnswer: "1540", explanation: "1540." },
      { id: "me12", questionText: "r=6, 60 deg sector?", options: ["6pi", "12pi", "18pi", "None"], correctAnswer: "6pi", explanation: "6pi." },
      { id: "me13", questionText: "Circle r=42 to square, side?", options: ["66", "44", "33", "None"], correctAnswer: "66", explanation: "66." },
      { id: "me14", questionText: "r=3, h=4 cone vol?", options: ["12pi", "36pi", "48pi", "None"], correctAnswer: "12pi", explanation: "12pi." },
      { id: "me15", questionText: "Area = Circum, r?", options: ["1", "2", "3", "4"], correctAnswer: "2", explanation: "2." }
    ]
  },
  {
    topicId: "probability-prism-1",
    title: "Probability Prism",
    conceptTitle: "The Laws of Chance",
    conceptDescription: "Probability measures the likelihood of an event occurring. It ranges from 0 (impossible) to 1 (certain). Combinatorics helps us count the total number of possible outcomes without listing them all.",
    formulas: [
      "P(E) = \\frac{\\text{Favorable Outcomes}}{\\text{Total Outcomes}}",
      "P(A \\cup B) = P(A) + P(B) - P(A \\cap B)",
      "nCr = \\frac{n!}{r!(n-r)!} \\text{ (Selection)}",
      "nPr = \\frac{n!}{(n-r)!} \\text{ (Arrangement)}"
    ],
    questions: [
      { id: "pr1", questionText: "A bag contains 6 black and 8 white balls. One ball is drawn at random. What is the probability that the ball drawn is white?", options: ["3/4", "4/7", "1/8", "3/7"], correctAnswer: "4/7", explanation: "Total balls = 14. White balls = 8. Probability = 8/14 = 4/7." },
      { id: "pr2", questionText: "Two dice are tossed. The probability that the total score is a prime number is?", options: ["1/6", "5/12", "1/2", "7/9"], correctAnswer: "5/12", explanation: "Total outcomes = 36. Sums that are prime: 2, 3, 5, 7, 11. Favorable cases: (1,1), (1,2), (2,1), (1,4), (4,1), (2,3), (3,2), (1,6), (6,1), (2,5), (5,2), (3,4), (4,3), (5,6), (6,5) = 15 cases. 15/36 = 5/12." },
      { id: "pr3", questionText: "In how many ways can a committee of 5 members be formed from 6 men and 4 women such that it contains 3 men and 2 women?", options: ["120", "150", "180", "200"], correctAnswer: "120", explanation: "Ways = (6C3) * (4C2) = 20 * 6 = 120." },
      { id: "pr4", questionText: "A card is drawn from a pack of 52 cards. The probability that it is a face card (Jack, Queen, or King) is?", options: ["1/13", "2/13", "3/13", "4/13"], correctAnswer: "3/13", explanation: "Total face cards = 12. Probability = 12/52 = 3/13." },
      { id: "pr5", questionText: "Three unbiased coins are tossed. What is the probability of getting at most two heads?", options: ["3/4", "1/4", "3/8", "7/8"], correctAnswer: "7/8", explanation: "Total outcomes = 2^3 = 8. 'At most 2 heads' means everything except 3 heads (HHH). 8 - 1 = 7. Prob = 7/8." },
      { id: "pr6", questionText: "How many 3-digit numbers can be formed from the digits 2, 3, 5, 6, 7 and 9, which are divisible by 5 and none of the digits is repeated?", options: ["5", "10", "15", "20"], correctAnswer: "20", explanation: "To be divisible by 5, the last digit must be 5. Remaining 2 positions can be filled by 5 available digits: 5 * 4 = 20." },
      { id: "pr7", questionText: "The probability that a leap year has 53 Sundays is?", options: ["1/7", "2/7", "53/366", "None"], correctAnswer: "2/7", explanation: "Leap year = 366 days = 52 weeks + 2 days. The 2 days can be (Sun,Mon), (Mon,Tue)... (Sat,Sun). 2 out of 7 cases have a Sunday." },
      { id: "pr8", questionText: "In a box, there are 8 red, 7 blue and 6 green balls. One ball is picked up randomly. What is the probability that it is neither red nor green?", options: ["1/3", "3/4", "7/19", "8/21"], correctAnswer: "1/3", explanation: "Total = 8+7+6 = 21. Neither red nor green means it must be blue. Blue = 7. Prob = 7/21 = 1/3." },
      { id: "pr9", questionText: "Two cards are drawn together from a pack of 52 cards. The probability that one is a spade and one is a heart is?", options: ["13/102", "26/51", "13/51", "None"], correctAnswer: "13/102", explanation: "(13C1 * 13C1) / 52C2 = (13 * 13) / 1326 = 169 / 1326 = 13/102." },
      { id: "pr10", questionText: "In how many ways can the letters of the word 'LEADER' be arranged?", options: ["720", "360", "144", "72"], correctAnswer: "360", explanation: "Total letters = 6. E repeats twice. Ways = 6! / 2! = 720 / 2 = 360." },
      { id: "pr11", questionText: "What is the probability of getting a sum 9 from two throws of a dice?", options: ["1/6", "1/8", "1/9", "1/12"], correctAnswer: "1/9", explanation: "Favorable: (3,6), (4,5), (5,4), (6,3) = 4 cases. Total = 36. 4/36 = 1/9." },
      { id: "pr12", questionText: "Out of 7 consonants and 4 vowels, how many words of 3 consonants and 2 vowels can be formed?", options: ["210", "25200", "24400", "21300"], correctAnswer: "25200", explanation: "Selection = 7C3 * 4C2 = 35 * 6 = 210. Arrangement of 5 letters = 5! = 120. Total = 210 * 120 = 25200." },
      { id: "pr13", questionText: "Seven fruit vendors are to be seated in a row. What is the probability that two particular vendors sit together?", options: ["2/7", "1/7", "3/7", "4/7"], correctAnswer: "2/7", explanation: "Treat 2 vendors as 1 unit. Total units = 6. Arrangement = 6! * 2!. Total arrangements = 7!. Prob = (6! * 2!) / 7! = 2/7." },
      { id: "pr14", questionText: "A box contains 20 electric bulbs, out of which 4 are defective. Two bulbs are chosen at random from this box. The probability that at least one of them is defective is?", options: ["4/19", "7/19", "12/19", "21/95"], correctAnswer: "7/19", explanation: "P(at least one) = 1 - P(none defective). P(none) = 16C2 / 20C2 = 120 / 190 = 12/19. 1 - 12/19 = 7/19." },
      { id: "pr15", questionText: "How many 4-letter words with or without meaning, can be formed out of the letters of the word, 'LOGARITHMS', if repetition of letters is not allowed?", options: ["40", "400", "5040", "2520"], correctAnswer: "5040", explanation: "Total letters = 10. We need to arrange 4. 10P4 = 10 * 9 * 8 * 7 = 5040." }
    ]
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to Atlas... 📡");
    
    // Clear everything
    await Aptitude.deleteMany({}); 
    
    await Aptitude.insertMany(aptitudeTopics);
    
    console.log("Dungeon Map Updated: 165 Quests Ready! ⚔️");
    process.exit();
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
};

seedDB();