import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css';

function ChallengeBox() {
  const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengesContext);
  const { resetCountdown } = useContext(CountdownContext);

  function handleChallengeSuccess() {
    completeChallenge();
    resetCountdown();
  }
  
  function handleChallengeFail() {
    resetChallenge();
    resetCountdown();
  }

  return (
    <div className={styles.challengeBoxContainer}>
      { activeChallenge ? (
        <div className={ styles.challengeActive }>
          <header>Ganhe { activeChallenge.amount }xp</header>
          <main>
            { activeChallenge.type == 'body' ? (
              <img src="icons/body.svg"/>
            ) : (
              <img src="icons/eye.svg"/>
            ) }
            <strong>Novo desafio!</strong>
            <p>{ activeChallenge.description }</p>
          </main>
          <footer>
            <button
              type="button"
              className={styles.challengeFailButton}
              onClick={() => handleChallengeFail()}
            >
              Falhei
            </button>
            <button
              type="button"
              className={styles.challengeSuccessButton}
              onClick={() => handleChallengeSuccess()}
            >
              Completei
            </button>
          </footer>
        </div>
      ) : (
          <div className={styles.challengeNotActive}>
            <strong>Finaliza um ciclo para receber um desafio!</strong>
            <p>
              <img src="icons/level-up.svg" alt="Level Up" />
          Avance de nível completando desafios.
        </p>
          </div>
        ) }
    </div>
  );
}

export default ChallengeBox
