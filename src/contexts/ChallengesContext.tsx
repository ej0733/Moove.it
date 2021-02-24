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
  const [currentExperience, setCurrentExperience] = useState(12);
  const [challengesCompleted, setChallengesCompleted] = useState(1);
  const [activeChallenge, setActiveChallenge] = useState(null);
  
  const levelUp = () => setLevel(level + 1);
  const experienceToNextLevel = Math.pow((level + 1) * 3, 2);
  
  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  const challengeData = {
    level,
    levelUp,
    currentExperience,
    challengesCompleted,
    startNewChallenge,
    activeChallenge,
    resetChallenge,
    experienceToNextLevel,
  };

  return (
    <ChallengesContext.Provider value={challengeData}>
      { children }
    </ChallengesContext.Provider>
  );
}