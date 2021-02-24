import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ChallengeBox.module.css';

function ChallengeBox() {
  const { activeChallenge, resetChallenge } = useContext(ChallengesContext);

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
              onClick={() => resetChallenge()}
            >
              Falhei
            </button>
            <button
              type="button"
              className={styles.challengeSuccessButton}
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
