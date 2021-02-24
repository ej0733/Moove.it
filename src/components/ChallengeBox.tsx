import styles from '../styles/components/ChallengeBox.module.css';

function ChallengeBox() {
  const hasChallenge = true;
  return (
    <div className={styles.challengeBoxContainer}>
      {hasChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe 400xp</header>
          <main>
            <img src="icons/body.svg"/>
            <strong>Novo desafio</strong>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, quasi illum, ullam libero atque enim aspernatur facere nostrum magni vitae explicabo. Illo animi corporis ipsa dolorum voluptatum omnis ex sit?</p>
          </main>
          <footer>
            <button
              type="button"
              className={styles.challengeFailButton}
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
        )}
    </div>
  );
}

export default ChallengeBox
