// 课程表 · the class schedule shown at /class: a grade, then a week. One entry
// per week; readings are lessons from the registry (the whole lesson, or the
// parts listed), so a week needs no new code — add a line here, run validate,
// deploy. The link for a week is /class?g=<grade>&w=<week>, before and after
// class. `date` (YYYY-MM-DD, the class day) is optional: with dates, /class
// opens the next class on or after today; without, the latest week.
export const grades = [
  {id: 3, title: {zh: '三年级', en: 'Grade 3'}},
];

export const weeks = [
  {grade: 3, n: 1,
    title: {zh: '爬高一点，看远一点', en: 'Climb Higher, See Farther'},
    readings: [{lesson: 'climb-higher'}],
    homework: {
      zh: '在家把三件作品再读一遍，听一听配音，录一次自己的朗读。',
      en: 'Read all three works again at home, listen to the narration, and record yourself reading once.',
    }},
];
