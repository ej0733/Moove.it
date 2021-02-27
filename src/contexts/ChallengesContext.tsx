import { createContext, useState, ReactNode, useEffect } from "react";
import Cookies from 'js-cookie';
import challenges from "../../challenges.json";
import { LevelUpModal } from "../components/LevelUpModal";

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
  closeLevelUpModal: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export function ChallengesProvider({
  children,
  ...rest
}: ChallengesProviderProps){
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpodalOpen] = useState(false);
  
  const experienceToNextLevel = Math.pow((level + 1) * 3, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set('level', level.toString());
    Cookies.set('currentExperience', currentExperience.toString());
    Cookies.set('challengesCompleted', challengesCompleted.toString());
  }, [level, currentExperience, challengesCompleted]);
  
  function levelUp() {
    setLevel(level + 1)
    setIsLevelUpodalOpen(true);
  };

  
  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];
    
    setActiveChallenge(challenge);
    
    new Audio('/notification.mp3').play();
    
    if(Notification.permission == 'granted') {
      new Notification('Novo desafio!', {
        body: `Valendo ${challenge.amount}xp!`,
      });
    }
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

  function closeLevelUpModal() {
    setIsLevelUpodalOpen(false);
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
    completeChallenge,
    closeLevelUpModal
  };

  return (
    <ChallengesContext.Provider value={challengeValues}>
      { children }
      { isLevelUpModalOpen && <LevelUpModal /> }
    </ChallengesContext.Provider>
  );
}