"use client";

import { KeyboardEvent, useCallback, useEffect, useState } from "react";

export default function Home() {
  const validityAccountKeys = ['+', '-', '/', '*'];

  const [firstNumber, setFirstNumber] = useState('');
  const [typeCalc, setTypeCalc] = useState('');
  const [secondNumber, setSecondNumber] = useState('');
  const [calcResult, setCalcResult] = useState(0);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [typeCalc]); 

  useEffect(() => {
    window.addEventListener('keydown', handleBackspace);
    return () => {
      window.removeEventListener('keydown', handleBackspace);
    };
  }, [firstNumber, secondNumber, typeCalc]);

  useEffect(() => {
    window.addEventListener('keydown', handleBackspace);
    return () => {
      window.removeEventListener('keydown', handleBackspace);
    };
  }, [firstNumber, secondNumber, typeCalc]);

  useEffect(() => {
    window.addEventListener('keydown', handleBackspace);
    return () => {
      window.removeEventListener('keydown', handleBackspace);
    };
  }, [firstNumber, secondNumber, typeCalc]);

  useEffect(() => {
    window.addEventListener('keydown', handleOperationPress);
    return () => {
      window.removeEventListener('keydown', handleOperationPress);
    };
  }, [typeCalc, firstNumber]);

  useEffect(() => {
    window.addEventListener('keydown', handleEnterPress);
    return () => {
      window.removeEventListener('keydown', handleEnterPress);
    };
  }, [firstNumber, secondNumber, typeCalc]);

  function handleEnterPress(event: globalThis.KeyboardEvent) {
    if (event.key === 'Enter') {
      handleResultPress();
    }
  }
  
  function handleKeyPress(event: globalThis.KeyboardEvent) {
    if (!isNaN(Number(event.key))) {
      setCalcResult(0);
      if (!typeCalc) {
        return setFirstNumber((prev) => {
          return prev + event.key;
        });
      }
      return setSecondNumber((prev) => {
        return prev + event.key;
      });
    }
  };

  function handleBackspace(event: globalThis.KeyboardEvent) {
    if (event.key === 'Backspace') {
      handleDeletePress();
    }
  }

  function handleOperationPress(event: globalThis.KeyboardEvent) {
    if (validityAccountKeys.includes(event.key)) {
      if (!typeCalc && firstNumber) {
        setTypeCalc(event.key);
      }
    }
  }

  function handleNumberPress(number: number | string){
    setCalcResult(0);
    if (!typeCalc) {
      return setFirstNumber(firstNumber + String(number));
    }
    return setSecondNumber(secondNumber + String(number));
  }

  function renderNumberButton() {
    const generateArrays = Array.from(Array(10).keys());
    return generateArrays.map((number) => {

      return (
        <button key={number} onClick={() => handleNumberPress(number)} className="hover:opacity-60 text-2xl flex h-16 items-center justify-center border rounded-md border-orange-500">
          {number}
        </button>
      )
    });
  }

  function resetInfo() {
    setFirstNumber('');
    setSecondNumber('');
    setTypeCalc('');
  }

  function handleResultPress() {
    resetInfo();
    switch (typeCalc) {
      case '+':
        return setCalcResult(Number(firstNumber) + Number(secondNumber));
      case '-':
        return setCalcResult(Number(firstNumber) - Number(secondNumber));
      case '*':
        return setCalcResult(Number(firstNumber) * Number(secondNumber));
      case '/':
        return setCalcResult(Number(firstNumber) / Number(secondNumber));
    }
  }

  function operationButton(typeOperation: string) {
    function handleCalcPress() {
      if (!typeCalc && firstNumber) {
        setTypeCalc(typeOperation);
      }
    }

    return (
      <button onClick={handleCalcPress} className="text-2xl hover:opacity-60 flex h-16 items-center justify-center border rounded-md border-orange-500">
        {typeOperation}
      </button>
    )
  }

  function handleDeletePress() {
    if (secondNumber) {
      return setSecondNumber(secondNumber.slice(0, secondNumber.length - 1));
    }
    if (typeCalc) {
      return setTypeCalc('');
    }
    return setFirstNumber(firstNumber.slice(0, firstNumber.length - 1));
  }

  function renderNumberArea() {
    if (calcResult) {
      return calcResult;
    }

    return typeCalc ? secondNumber : firstNumber;
  }

  function handleDotPress() {
    if (firstNumber && !secondNumber) {
      return setFirstNumber(firstNumber + '.');
    }
    return setSecondNumber(secondNumber + '.');
  }

  return (
    <main className="bg-blue-300/50 flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-zinc-300 w-96 border rounded-md border-black relative">
        <div className="h-16 m-3 border border-orange-500 p-3 rounded-md flex items-end justify-end text-2xl overflow-auto">
          {typeCalc && (
            <div className="text-sm absolute right-4 top-4">
              {firstNumber}
              {typeCalc}
            </div>
          )}
          {renderNumberArea()}
        </div>
        <div className="grid grid-cols-3 p-3 gap-3">
          {renderNumberButton()}
          {operationButton('+')}
          {operationButton('-')}
          {operationButton('*')}
          {operationButton('/')}
          <button onClick={handleDotPress} className="hover:opacity-60 text-2xl border rounded-md border-orange-500">
            .
          </button>
          <button onClick={handleDeletePress} className="hover:opacity-60 text-2xl col-span-3 border rounded-md border-orange-500 h-16">
            C
          </button>
          <button onClick={handleResultPress} className="hover:opacity-60 text-2xl col-span-3 border rounded-md border-orange-500 h-16">
            =
          </button>
        </div>
      </div>
    </main>
  )
}
