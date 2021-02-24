import styles from '../styles/components/CompletedChallenges.module.css';

function CompletedChallenges() {
  return (
    <div className={styles.completedChallengesContainer}>
      <span>Desafios Completos</span>
      <span>0</span>
    </div>
  );
}

export default CompletedChallenges
