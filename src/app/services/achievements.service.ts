import {Injectable} from '@angular/core';
import {DEFAULT_ACHIEVEMENTS} from "../contants/achievements.constants";
import {
  Achievement,
  ACHIEVEMENT_CATEGORY,
  ACHIEVEMENT_ID,
  ACHIEVEMENT_LOCAL_STORAGE_KEYS
} from "../models/achievements.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LogicalFileSystem} from "@angular/compiler-cli";

@Injectable({
  providedIn: 'root'
})
export class AchievementsService {

  showSaluteAnimation = false;
  saluteEmojis: { char: string, style: any }[] = [];

  public DEFAULT_ACHIEVEMENTS: Achievement[] = DEFAULT_ACHIEVEMENTS;
  public localAchievements: Achievement[] = [];
  public localAchievements_uniqueHeartMessages: number[] = [];

  constructor(
    public matSnackBar: MatSnackBar
  ) {
  }

  checkRunAlgorithmAchievementProgress(achievementId: ACHIEVEMENT_ID) {
    if (!this.localAchievements.length) {
      return 0;
    }

    let achievement = this.localAchievements.find((el) => el.id === achievementId);

    let target = Object.keys(achievement?.criteria.ranAlgorithms || {}).length;
    let progress = 0;
    Object.keys(achievement?.criteria.ranAlgorithms || {}).forEach((key: any) => {

      if (
        achievement?.criteria &&
        achievement?.criteria.ranAlgorithms &&
        //@ts-ignore
        achievement?.criteria.ranAlgorithms[key]) {

        progress++;
      }
    })

    return parseInt(((progress * 100) / target).toString());
  }


  checkNumericAchievementProgress(achievementId: ACHIEVEMENT_ID) {
    if (!this.localAchievements.length) {
      return 0;
    }

    let achievement = this.localAchievements.find((el) => el.id === achievementId);
    let progress = achievement?.progress || 0;
    let target = achievement?.criteria.target || 0;

    return parseInt(((progress * 100) / target).toString());
  }

  checkIfLockedOrUnlocked(achievementId: ACHIEVEMENT_ID) {
    if (!this.localAchievements.length) {
      return 'locked';
    }

    let achievement = this.localAchievements.find((el) => el.id === achievementId);

    return achievement?.isUnlocked ? 'unlocked' : 'locked';
  }

  getUnlockDateString(achievementId: ACHIEVEMENT_ID) {
    if (!this.localAchievements.length) {
      return '';
    }

    let achievement: Achievement = this.getAchievementById(achievementId) as Achievement;

    return achievement?.isUnlocked ? achievement.unlockedOn : '';
  }

  getAchievementById(
    achievementId: ACHIEVEMENT_ID
  ) {
    if (!this.localAchievements.length) {
      return {};
    }
    return this.localAchievements.find((el) => el.id === achievementId);
  }

  getIndexOfAchievementById(
    achievementId: ACHIEVEMENT_ID
  ) {
    if (!this.localAchievements.length) {
      return -1;
    }
    return this.localAchievements.findIndex((el) => el.id === achievementId);
  }

  loadLocalAchievementsModules() {
    const localAchievements: string | null = localStorage.getItem(ACHIEVEMENT_LOCAL_STORAGE_KEYS.GLOBAL);
    const localAchievements_uniqueHeartMessages: string | null = localStorage.getItem(ACHIEVEMENT_LOCAL_STORAGE_KEYS.HEART_UNIQUE_MESSAGE);

    if (!localAchievements) {
      this.initializeLocalAchievements(ACHIEVEMENT_LOCAL_STORAGE_KEYS.GLOBAL, this.DEFAULT_ACHIEVEMENTS);

      // this way if any new achievement is added to the system, it will be added into local achievements
      this.DEFAULT_ACHIEVEMENTS.forEach((DEFAULT_ACHIEVEMENT:Achievement) => {
        if(
          this.localAchievements &&
          this.localAchievements.find((localAchievement: Achievement) => localAchievement.id === DEFAULT_ACHIEVEMENT.id)) {
          return
        }
        this.localAchievements.push(DEFAULT_ACHIEVEMENT)
      })

    } else
      this.localAchievements = JSON.parse(localAchievements)

    if (!localAchievements_uniqueHeartMessages) {
      this.initializeLocalAchievements(ACHIEVEMENT_LOCAL_STORAGE_KEYS.HEART_UNIQUE_MESSAGE, this.DEFAULT_ACHIEVEMENTS);
    } else
      this.localAchievements_uniqueHeartMessages = JSON.parse(localAchievements_uniqueHeartMessages)
  }

  initializeLocalAchievements(category: ACHIEVEMENT_LOCAL_STORAGE_KEYS, initialValue: any = []): void {
    localStorage.setItem(category, JSON.stringify(initialValue));
  }

  saveAchievements(localStorageKey: ACHIEVEMENT_LOCAL_STORAGE_KEYS, value: any) {
    localStorage.setItem(localStorageKey, JSON.stringify(value));
  }

  triggerSalute() {
    this.saluteEmojis = Array.from({length: 25}, () => {
      const emojiList = [
        '🎉', '🚀', '👏', '✨', '💯', '🌟', '🧠',
        '🔥', '🥇', '🏆', '😎', '🎯', '💥', '🧩', '🛠️', '⚡', '🤖', '🧬'
      ];
      return {
        char: emojiList[Math.floor(Math.random() * emojiList.length)],
        style: {
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 0.5}s`,
          fontSize: `${Math.random() * 1.5 + 1}rem`,
        }
      };
    });

    this.showSaluteAnimation = true;

    setTimeout(() => {
      this.showSaluteAnimation = false;
    }, 3000); // Show for 3 seconds
  }

  getLocalAchievementsByCategory(
    categoryName: ACHIEVEMENT_CATEGORY
  ) {
    let localAchievementItems = this.localAchievements.filter((el) => el.category === categoryName);

    if (!localAchievementItems || !localAchievementItems.length) {
      localAchievementItems = DEFAULT_ACHIEVEMENTS.filter((el) => el.category === categoryName);
    }

    return localAchievementItems;
  }

  get unlockedAchievementCount() {
    return this.localAchievements?.filter((el) => el.isUnlocked).length || 0;
  }

  get allAchievementCount() {
    return this.DEFAULT_ACHIEVEMENTS.length;
  }

  getFormatDateForDisplay(date: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0')

    const day = pad(date.getDate())
    const month = pad(date.getMonth() + 1) // Months are 0-based
    const year = date.getFullYear().toString().slice(-2)
    const hours = pad(date.getHours())
    const minutes = pad(date.getMinutes())

    return `${day}/${month}/${year} ${hours}:${minutes}`
  }


  // progress adding functions
  // HEART UNIQUE MESSAGES
  addProgressForHeartUniqueMessages(messageIndex: number) {
    if (this.localAchievements_uniqueHeartMessages.includes(messageIndex)) {
      return;
    }
    this.localAchievements_uniqueHeartMessages.push(messageIndex);
    this.saveAchievements(ACHIEVEMENT_LOCAL_STORAGE_KEYS.HEART_UNIQUE_MESSAGE, this.localAchievements_uniqueHeartMessages)

    this.addProgressForCountLikeAchievements(
      ACHIEVEMENT_CATEGORY.UNIQUE_HEART_MESSAGES
    )
  }

  // GENERAL ONE THAT WILL INCREASE PROGRESS FOR SIMPLE COUNT TYPES
  addProgressForCountLikeAchievements(
    categoryName: ACHIEVEMENT_CATEGORY
  ) {

    let localAchievementItems = this.getLocalAchievementsByCategory(categoryName);

    localAchievementItems.forEach((localAchievementItem) => {

      localAchievementItem.progress = localAchievementItem.progress || 0;

      if (localAchievementItem.progress !== localAchievementItem.criteria.target)
        localAchievementItem.progress++;

      if (localAchievementItem.progress === localAchievementItem.criteria.target && !localAchievementItem.isUnlocked) {
        localAchievementItem.isUnlocked = true;
        localAchievementItem.unlockedOn = this.getFormatDateForDisplay(new Date());
        this.matSnackBar.open(`Congratulations, new achievement unlocked!! ${localAchievementItem.name} \n~ ${localAchievementItem.description} \nUnlocked on ${localAchievementItem.unlockedOn}`, 'Cool!');
        this.triggerSalute();
      }

      let elementIndexFromLocalStorage = this.localAchievements.findIndex((el) => el.id === localAchievementItem.id);

      if (elementIndexFromLocalStorage === -1) {
        this.localAchievements.push(localAchievementItem);
      } else {
        this.localAchievements[elementIndexFromLocalStorage] = {...localAchievementItem}
      }
    })

    this.saveAchievements(ACHIEVEMENT_LOCAL_STORAGE_KEYS.GLOBAL, this.localAchievements);
  }

  addProgressForRunAlgorithmTypeAchievements(
    achievementId: ACHIEVEMENT_ID,
    algorithm: 'DFS' | 'BFS' | 'Dijkstra' | 'Kruskal' | 'Prim' | 'AllPaths' | 'Eades' | 'ShortLongPathsDFS') {

    let localAchievementItem = this.getAchievementById(achievementId) as Achievement;

    if (
      localAchievementItem.criteria &&
      localAchievementItem.criteria.ranAlgorithms &&
      !localAchievementItem.criteria.ranAlgorithms[algorithm]) {
      localAchievementItem.criteria.ranAlgorithms[algorithm] = true;
    }

    if (this.checkRunAlgorithmAchievementProgress(achievementId) === 100) {
      localAchievementItem.isUnlocked = true;
      localAchievementItem.unlockedOn = this.getFormatDateForDisplay(new Date());
      this.matSnackBar.open(`Congratulations, new achievement unlocked!! ${localAchievementItem.name} \n~ ${localAchievementItem.description} \nUnlocked on ${localAchievementItem.unlockedOn}`, 'Cool!');
      this.triggerSalute();
    }


    let elementIndexFromLocalStorage = this.getIndexOfAchievementById(localAchievementItem.id);

    if (elementIndexFromLocalStorage === -1) {
      this.localAchievements.push(localAchievementItem);
    } else {
      this.localAchievements[elementIndexFromLocalStorage] = {...localAchievementItem}
    }

    this.saveAchievements(ACHIEVEMENT_LOCAL_STORAGE_KEYS.GLOBAL, this.localAchievements);
  }
}
