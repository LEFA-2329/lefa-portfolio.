export function cleanDatabaseLesson(raw, lesson = null) {
  const count = lesson?.quizzes?.length || 2,
    changed = !!lesson?.quizRevision && raw?.quizRevision !== lesson.quizRevision;
  return {
    revision: typeof raw?.revision === 'string' ? raw.revision.slice(0, 40) : '',
    quizRevision: lesson?.quizRevision || '',
    tab: ['learn', 'quiz', 'practice'].includes(raw?.tab) ? raw.tab : 'learn',
    choices:
      !changed && Array.isArray(raw?.choices)
        ? raw.choices
            .slice(0, count)
            .map((v, i) =>
              Number.isInteger(v) &&
              v >= 0 &&
              v < (lesson?.quizzes[i]?.options.length || 5)
                ? v
                : null,
            )
        : [],
    checked:
      !changed && Array.isArray(raw?.checked)
        ? raw.checked.slice(0, count).map((v) => v === true)
        : [],
    taskIndex:
      Number.isInteger(raw?.taskIndex) && raw.taskIndex >= 0 && raw.taskIndex < 10
        ? raw.taskIndex
        : 0,
    draft: typeof raw?.draft === 'string' ? raw.draft.slice(0, 20000) : '',
    attempted: raw?.attempted === true,
    hint: raw?.hint === true,
    revealed: raw?.revealed === true,
  };
}
