import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import styles from './CommunityGoals.module.css';

function CommunityGoals({ profile }) {
  // Goal 1: Help 3 neighbors
  const helped = profile?.helpedCount || 0;
  const goal1Progress = Math.min(100, Math.floor((helped / 3) * 100));
  const goal1Completed = helped >= 3;

  // Goal 2: Share 1 unused item
  const itemsCount = profile?.lendingItems?.length || 0;
  const goal2Progress = Math.min(100, Math.floor((itemsCount / 1) * 100));
  const goal2Completed = itemsCount >= 1;

  // Goal 3: Complete 5 actions (helped + items + blood + skills)
  const blood = profile?.bloodDonations || 0;
  const skillsCount = profile?.skills?.length || 0;
  const totalActions = helped + itemsCount + blood + skillsCount;
  const goal3Progress = Math.min(100, Math.floor((totalActions / 5) * 100));
  const goal3Completed = totalActions >= 5;

  const goalsList = [
    {
      id: 1,
      title: 'Help 3 neighbors this month',
      subtitle: `${helped} of 3 completed`,
      progress: goal1Progress,
      completed: goal1Completed,
      badge: '🤝 Helper Title'
    },
    {
      id: 2,
      title: 'Share one unused item',
      subtitle: `${itemsCount} of 1 items listed`,
      progress: goal2Progress,
      completed: goal2Completed,
      badge: '🛠 Tool Master'
    },
    {
      id: 3,
      title: 'Complete 5 community actions',
      subtitle: `${totalActions} of 5 actions logged`,
      progress: goal3Progress,
      completed: goal3Completed,
      badge: '🏡 Super Neighbor'
    }
  ];

  return (
    <div className={`${styles.goalsCard} glass-panel`}>
      <h3 className={styles.cardTitle}>Community Goals</h3>
      <p className={styles.cardDesc}>Earn extra badges and trust score boosts by completing monthly actions.</p>

      <div className={styles.goalsStack}>
        {goalsList.map((goal) => (
          <div key={goal.id} className={styles.goalItem}>
            <div className={styles.goalTop}>
              <div className={styles.checkIconWrapper}>
                {goal.completed ? (
                  <CheckCircle2 size={18} className={styles.completedIcon} />
                ) : (
                  <Circle size={18} className={styles.incompleteIcon} />
                )}
              </div>
              <div className={styles.goalTexts}>
                <p className={`${styles.goalTitle} ${goal.completed ? styles.goalTitleCompleted : ''}`}>
                  {goal.title}
                </p>
                <span className={styles.goalSub}>{goal.subtitle}</span>
              </div>
            </div>

            {/* Linear Progress Bar */}
            <div className={styles.progressRow}>
              <div className={styles.progressBarBg}>
                <div 
                  className={styles.progressBarFill} 
                  style={{ 
                    width: `${goal.progress}%`,
                    backgroundColor: goal.completed ? 'var(--color-primary)' : 'var(--color-secondary)'
                  }}
                />
              </div>
              <span className={styles.progressPercent}>{goal.progress}%</span>
            </div>

            {/* Unlocked Reward Badge Label */}
            {goal.completed && (
              <div className={styles.rewardRow}>
                <span className={styles.rewardLabel}>Unlocked Reward:</span>
                <span className={styles.rewardBadge}>{goal.badge}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommunityGoals;
