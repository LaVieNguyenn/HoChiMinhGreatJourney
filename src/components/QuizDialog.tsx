import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { quizQuestions, QUIZ_DURATION_SECONDS, QuizQuestion } from '@/data/quizQuestions';
import { cn } from '@/lib/utils';

const TOTAL_QUESTIONS = quizQuestions.length;

const createInitialSelections = (): (number | null)[] =>
  quizQuestions.map((question) => (question.type === 'multiple-choice' ? null : null));

const createInitialFillInResponses = (): string[][] =>
  quizQuestions.map((question) => (question.type === 'fill-in' ? question.correctAnswers.map(() => '') : []));

const stripDiacritics = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');

const normalizeAnswer = (value: string) => stripDiacritics(value.trim().toLowerCase());

const formatTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
};

interface QuizDialogProps {
  trigger?: React.ReactNode;
}

const QuizDialog: React.FC<QuizDialogProps> = ({ trigger }) => {
  const [open, setOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<(number | null)[]>(() => createInitialSelections());
  const [fillInResponses, setFillInResponses] = useState<string[][]>(() => createInitialFillInResponses());
  const [revealedAnswers, setRevealedAnswers] = useState<boolean[]>(() => quizQuestions.map(() => false));
  const [remainingTime, setRemainingTime] = useState(QUIZ_DURATION_SECONDS);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [autoSubmitted, setAutoSubmitted] = useState(false);

  const resetQuiz = useCallback(() => {
    setSelectedOptions(createInitialSelections());
    setFillInResponses(createInitialFillInResponses());
    setRevealedAnswers(quizQuestions.map(() => false));
    setRemainingTime(QUIZ_DURATION_SECONDS);
    setIsSubmitted(false);
    setScore(0);
    setAutoSubmitted(false);
  }, []);

  useEffect(() => {
    if (open) {
      resetQuiz();
    }
  }, [open, resetQuiz]);

  const handleSubmit = useCallback(
    (auto = false) => {
      if (isSubmitted) {
        return;
      }

      let total = 0;

      quizQuestions.forEach((question, index) => {
        if (question.type === 'multiple-choice') {
          if (selectedOptions[index] === question.correctOption) {
            total += 1;
          }
        } else {
          const expectedAnswers = question.correctAnswers;
          const userAnswers = fillInResponses[index] ?? [];

          const allCorrect = expectedAnswers.every((answer, answerIndex) => {
            const userAnswer = userAnswers[answerIndex] ?? '';
            return normalizeAnswer(userAnswer) === normalizeAnswer(answer);
          });

          if (allCorrect) {
            total += 1;
          }
        }
      });

      setScore(total);
      setIsSubmitted(true);
      setAutoSubmitted(auto);
    },
    [fillInResponses, isSubmitted, selectedOptions],
  );

  useEffect(() => {
    if (!open || isSubmitted) {
      return;
    }

    if (remainingTime <= 0) {
      handleSubmit(true);
      return;
    }

    const interval = window.setInterval(() => {
      setRemainingTime((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [handleSubmit, isSubmitted, open, remainingTime]);

  const handleOptionSelect = (questionIndex: number, optionIndex: number) => {
    if (isSubmitted) {
      return;
    }

    setSelectedOptions((prev) => {
      const next = [...prev];
      next[questionIndex] = optionIndex;
      return next;
    });
  };

  const handleFillInChange = (questionIndex: number, blankIndex: number, value: string) => {
    if (isSubmitted) {
      return;
    }

    setFillInResponses((prev) => {
      const next = [...prev];
      const responses = [...(next[questionIndex] ?? [])];
      responses[blankIndex] = value;
      next[questionIndex] = responses;
      return next;
    });
  };

  const toggleRevealAnswer = (index: number) => {
    setRevealedAnswers((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const answeredCount = useMemo(() => {
    return quizQuestions.reduce((count, question, index) => {
      if (question.type === 'multiple-choice') {
        return count + (selectedOptions[index] !== null ? 1 : 0);
      }

      const userAnswers = fillInResponses[index] ?? [];
      const hasAnyValue = userAnswers.some((answer) => answer.trim() !== '');
      return count + (hasAnyValue ? 1 : 0);
    }, 0);
  }, [fillInResponses, selectedOptions]);

  const renderQuestion = (question: QuizQuestion, index: number) => {
    if (question.type === 'multiple-choice') {
      const userSelection = selectedOptions[index];
      const isCorrect = isSubmitted && userSelection === question.correctOption;

      return (
        <div key={question.id} className="space-y-4">
          <p className="font-semibold text-lg text-foreground">{question.prompt}</p>
          <RadioGroup
            value={userSelection !== null ? String(userSelection) : undefined}
            onValueChange={(value) => handleOptionSelect(index, Number(value))}
            className="space-y-3"
          >
            {question.options.map((option, optionIndex) => {
              const letter = String.fromCharCode(65 + optionIndex);
              const isSelected = userSelection === optionIndex;
              const optionClasses = cn(
                'flex items-center gap-3 rounded-md border p-3 transition-colors',
                !isSubmitted && isSelected && 'border-primary bg-primary/10',
                isSubmitted && question.correctOption === optionIndex && 'border-green-500 bg-green-50 dark:bg-green-950/40',
                isSubmitted && isSelected && question.correctOption !== optionIndex && 'border-red-500 bg-red-50 dark:bg-red-950/40',
              );

              return (
                <div key={optionIndex} className={optionClasses}>
                  <RadioGroupItem
                    id={`${question.id}-${optionIndex}`}
                    value={String(optionIndex)}
                    disabled={isSubmitted}
                  />
                  <Label htmlFor={`${question.id}-${optionIndex}`} className="flex-1 cursor-pointer">
                    <span className="font-medium text-foreground">{letter}. {option}</span>
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
          {isSubmitted && (
            <p className={cn('text-sm font-medium', isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400')}>
              {isCorrect ? 'Bạn đã trả lời đúng.' : 'Bạn đã trả lời chưa chính xác.'}
            </p>
          )}
        </div>
      );
    }

    const userAnswers = fillInResponses[index] ?? [];
    const allCorrect = isSubmitted
      ? question.correctAnswers.every((answer, answerIndex) => {
          const userAnswer = userAnswers[answerIndex] ?? '';
          return normalizeAnswer(userAnswer) === normalizeAnswer(answer);
        })
      : false;

    return (
      <div key={question.id} className="space-y-4">
        <p className="font-semibold text-lg text-foreground">{question.prompt}</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {question.correctAnswers.map((_, answerIndex) => {
            const userAnswer = userAnswers[answerIndex] ?? '';
            const isBlankCorrect =
              isSubmitted && normalizeAnswer(userAnswer) === normalizeAnswer(question.correctAnswers[answerIndex]);

            return (
              <Input
                key={`${question.id}-blank-${answerIndex}`}
                placeholder={`Từ số ${answerIndex + 1}`}
                value={userAnswer}
                onChange={(event) => handleFillInChange(index, answerIndex, event.target.value)}
                disabled={isSubmitted}
                className={cn(
                  'w-full',
                  isSubmitted && (isBlankCorrect ? 'border-green-500' : 'border-red-500'),
                )}
              />
            );
          })}
        </div>
        {isSubmitted && (
          <p className={cn('text-sm font-medium', allCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400')}>
            {allCorrect ? 'Bạn đã hoàn thành chính xác câu điền từ.' : 'Câu điền từ chưa chính xác hoàn toàn.'}
          </p>
        )}
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl font-bold">Quiz Lịch Sử Hồ Chí Minh</DialogTitle>
          <DialogDescription>
            Trả lời 30 câu hỏi trong vòng 30 phút. Bấm “Hiển thị đáp án” để xem gợi ý sau khi hoàn thành từng câu.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-muted/50 p-4 text-sm">
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="text-base font-semibold">
              ⏳ {formatTime(remainingTime)}
            </Badge>
            <span>
              Đã trả lời <strong>{answeredCount}</strong> / {TOTAL_QUESTIONS} câu
            </span>
          </div>
          <div className="flex items-center gap-2">
            {isSubmitted && (
              <Badge variant={autoSubmitted ? 'destructive' : 'default'} className="text-sm">
                {autoSubmitted ? 'Hết giờ - hệ thống tự nộp bài' : 'Đã nộp bài'}
              </Badge>
            )}
            <Badge variant="outline" className="text-sm">
              Điểm: {score} / {TOTAL_QUESTIONS}
            </Badge>
          </div>
        </div>

        <ScrollArea className="h-[55vh] rounded-md border p-4">
          <div className="space-y-8">
            {quizQuestions.map((question, index) => (
              <div key={question.id} className="space-y-4 rounded-lg border border-border bg-background/40 p-4 shadow-sm">
                {renderQuestion(question, index)}
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="ghost" size="sm" onClick={() => toggleRevealAnswer(index)}>
                    {revealedAnswers[index] ? 'Ẩn đáp án' : 'Hiển thị đáp án'}
                  </Button>
                  {revealedAnswers[index] && (
                    <div className="text-sm text-muted-foreground">
                      <p>
                        <span className="font-semibold text-foreground">Đáp án đúng:</span>{' '}
                        {question.type === 'multiple-choice'
                          ? `${String.fromCharCode(65 + question.correctOption)}. ${
                              question.options[question.correctOption]
                            }`
                          : question.correctAnswers.join(' / ')}
                      </p>
                      {question.explanation && <p className="mt-1">{question.explanation}</p>}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-muted-foreground">
            {isSubmitted
              ? 'Bạn có thể bấm “Làm lại” để bắt đầu lượt chơi mới.'
              : 'Hãy kiểm tra kỹ trước khi nộp bài. Hết giờ hệ thống sẽ tự động nộp.'}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={resetQuiz} disabled={!isSubmitted}>
              Làm lại
            </Button>
            <Button onClick={() => handleSubmit(false)} disabled={isSubmitted}>
              Nộp bài
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuizDialog;
