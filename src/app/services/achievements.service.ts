import { Injectable } from '@angular/core';
import {DEFAULT_ACHIEVEMENTS} from "../contants/achievements.constants";
import {Achievement, ACHIEVEMENT_CATEGORY, ACHIEVEMENT_ID} from "../models/achievements.model";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class AchievementsService {

  showSaluteAnimation = false;
  saluteEmojis: { char: string, style: any }[] = [];

  public DEFAULT_ACHIEVEMENTS: Achievement[] = DEFAULT_ACHIEVEMENTS;
  public localAchievements: Achievement[] = [];

  constructor(
    public matSnackBar: MatSnackBar
  ) {
  }

  checkNumericAchievementProgress(achievementId: ACHIEVEMENT_ID) {
    if(!this.localAchievements.length){
      return 0;
    }

    let achievement = this.localAchievements.find((el) => el.id === achievementId);
    let progress = achievement?.progress || 0;
    let target = achievement?.criteria.target || 0;

    return parseInt(((progress * 100)/target).toString());
  }

  checkIfLockedOrUnlocked(achievementId: ACHIEVEMENT_ID){
    if(!this.localAchievements.length){
      return 'locked';
    }

    let achievement = this.localAchievements.find((el) => el.id === achievementId);

    return achievement?.isUnlocked ? 'unlocked' : 'locked';
  }

  loadLocalAchievements(){
    const localAchievements: string | null = localStorage.getItem('achievements');

    if(!localAchievements){
      this.initializeLocalAchievements();
      return;
    }

    this.localAchievements = JSON.parse(localAchievements);
  }

  initializeLocalAchievements(): void {
    localStorage.setItem('achievements', JSON.stringify([]));
  }

  saveAchievements(){
    localStorage.setItem('achievements', JSON.stringify(this.localAchievements));
  }

  addProgressForCountLikeAchievements(
    categoryName: ACHIEVEMENT_CATEGORY
  ){

    let localAchievementItems = this.localAchievements.filter((el) => el.category === categoryName);

    if(!localAchievementItems || !localAchievementItems.length){
      localAchievementItems = DEFAULT_ACHIEVEMENTS.filter((el) => el.category === categoryName);
    }

    localAchievementItems.forEach((localAchievementItem) => {

      localAchievementItem.progress = localAchievementItem.progress || 0;

      if(localAchievementItem.progress !== localAchievementItem.criteria.target)
        localAchievementItem.progress++;

      if(localAchievementItem.progress === localAchievementItem.criteria.target  && !localAchievementItem.isUnlocked){
        localAchievementItem.isUnlocked = true;
        this.matSnackBar.open(`Congratulations, new achievement unlocked!! ${localAchievementItem.name}`, 'Cool!');
        this.triggerSalute();
      }

      let elementIndexFromLocalStorage = this.localAchievements.findIndex((el) => el.id === localAchievementItem.id);

      if(elementIndexFromLocalStorage === -1){
        this.localAchievements.push(localAchievementItem);
      }else{
        this.localAchievements[elementIndexFromLocalStorage] = {...localAchievementItem}
      }
    })

    this.saveAchievements();
  }

  triggerSalute() {
    this.saluteEmojis = Array.from({ length: 25 }, () => {
      const emojiList = ['🎉', '🚀', '👏', '✨', '💯', '🌟', '🧠'];
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


  get unlockedAchievementCount(){
    return this.localAchievements?.filter((el) => el.isUnlocked).length || 0;
  }
}
