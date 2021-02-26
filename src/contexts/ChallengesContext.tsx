import { createContext, useState, ReactNode } from "react";
import challenges from "../../challenges.json";

export const ChallengesContext = createContext({} as ChallengesContextData);

interface ChallengesContextData {
  level: number;
  levelUp: () => void;
  currentExperience: number;
  challengesCompleted: number;
  experienceToNextLevel: number;
  startNewChallenge: () => void;
  completeChallenge: () => void;
  resetChallenge: () => void;
  activeChallenge: {
    type: 'body' | 'eye';
    description: string;
    amount: number;
  };
}


interface ChallengesProviderProps {
  children: ReactNode;
}

export function ChallengesProvider({ children }: ChallengesProviderProps){
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(null);
  
  const experienceToNextLevel = Math.pow((level + 1) * 3, 2);
  
  function levelUp() {
    setLevel(level + 1)
  };
  
  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if(!activeChallenge) {
      return;
    };

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    };
     
    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  const challengeValues: ChallengesContextData = {
    level,
    levelUp,
    currentExperience,
    challengesCompleted,
    startNewChallenge,
    activeChallenge,
    resetChallenge,
    experienceToNextLevel,
    completeChallenge
  };

  return (
    <ChallengesContext.Provider value={challengeValues}>
      { children }
    </ChallengesContext.Provider>
  );
}