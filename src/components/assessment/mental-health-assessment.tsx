
"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import questionsData from "@/data/questions.json";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

interface Question {
  id: string;
  text: string;
  options: { text: string; score: number }[];
}

interface ResultInterpretation {
  minScore: number;
  maxScore: number;
  level: string;
  description: string;
}

interface AssessmentRecord {
  timestamp: string;
  questionsUsed: Question[];
  answers: { [key: string]: number }; // questionId: score
  totalScore: number;
  result: {
    level: string;
    description: string;
  };
}

export function MentalHealthAssessment() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [resultDetails, setResultDetails] = useState<ResultInterpretation | null>(null);

  const { title, questions, resultsInterpretation, localStorageKey } = questionsData;

  useEffect(() => {
    if (isCompleted) {
      const record: AssessmentRecord = {
        timestamp: new Date().toISOString(),
        questionsUsed: questions,
        answers,
        totalScore: finalScore,
        result: {
          level: resultDetails?.level || "ไม่พบผลลัพธ์",
          description: resultDetails?.description || "ไม่สามารถให้คำแนะนำได้",
        },
      };

      try {
        const existingRecordsRaw = localStorage.getItem(localStorageKey);
        const existingRecords: AssessmentRecord[] = existingRecordsRaw
          ? JSON.parse(existingRecordsRaw)
          : [];
        existingRecords.push(record);
        localStorage.setItem(localStorageKey, JSON.stringify(existingRecords));
      } catch (error) {
        console.error("Error saving assessment to local storage:", error);
      }
    }
  }, [isCompleted, finalScore, resultDetails, answers, questions, localStorageKey]);

  const handleAnswerChange = (questionId: string, score: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: score }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResults();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateResults = () => {
    let score = 0;
    for (const q of questions) {
      score += answers[q.id] || 0;
    }
    setFinalScore(score);

    const result = resultsInterpretation.find(
      (r) => score >= r.minScore && score <= r.maxScore
    );
    setResultDetails(result || null);
    setIsCompleted(true);
  };

  const resetAssessment = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setIsCompleted(false);
    setFinalScore(0);
    setResultDetails(null);
  };

  if (isCompleted && resultDetails) {
    return (
      <Card className="w-full max-w-lg shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-primary font-headline text-center">ผลการประเมิน</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-lg">
            คะแนนรวมของคุณ: <span className="font-bold text-primary">{finalScore}</span>
          </p>
          <h3 className="text-xl font-semibold text-accent">{resultDetails.level}</h3>
          <p className="text-muted-foreground">{resultDetails.description}</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={resetAssessment} className="w-full sm:w-auto">ทำแบบประเมินอีกครั้ง</Button>
        </CardFooter>
      </Card>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progressValue = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <Card className="w-full max-w-lg shadow-lg rounded-xl">
      <CardHeader className="text-center">
        <p className="text-sm text-muted-foreground pt-2">
          คำถามที่ {currentQuestionIndex + 1} จาก {questions.length}
        </p>
        <Progress value={progressValue} className="w-full mt-2" />
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-lg font-medium text-center">{currentQuestion.text}</p>
        <RadioGroup
          value={answers[currentQuestion.id]?.toString()}
          onValueChange={(value) =>
            handleAnswerChange(currentQuestion.id, parseInt(value))
          }
          className="space-y-2"
        >
          {currentQuestion.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 border rounded-md hover:bg-muted/50">
              <RadioGroupItem value={option.score.toString()} id={`${currentQuestion.id}-option-${index}`} />
              <Label htmlFor={`${currentQuestion.id}-option-${index}`} className="flex-1 cursor-pointer text-base">
                {option.text}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between gap-2">
        <Button onClick={handlePrevious} disabled={currentQuestionIndex === 0} variant="outline" className="w-full sm:w-auto">
          ย้อนกลับ
        </Button>
        <Button 
          onClick={handleNext} 
          disabled={answers[currentQuestion.id] === undefined}
          className="w-full sm:w-auto"
        >
          {currentQuestionIndex === questions.length - 1 ? "ดูผลลัพธ์" : "ถัดไป"}
        </Button>
      </CardFooter>
    </Card>
  );
}
