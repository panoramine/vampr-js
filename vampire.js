class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentVampire = this;

    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampires++;
    }

    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer
  // to the original vampire)
  isMoreSeniorThan(vampire) {

    if (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal) {
      return true;
    } else {
      return false;
    }
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    if (!this.creator) {
      return this;
    }

    if (!vampire.creator) {
      return vampire;
    }

    if (this === vampire) {
      return this;
    }

    if (this.numberOfVampiresFromOriginal === 1 || vampire.numberOfVampiresFromOriginal === 1) {
      return this.creator;
    }

    if (this.isMoreSeniorThan(vampire)) {
      let seniorV = this.numberOfVampiresFromOriginal;
      let youngerV = vampire.numberOfVampiresFromOriginal;
      let counter = youngerV;
      let linkFromThePast = this.creator;
      let youngerAntecedent = vampire.creator;
      
      while (seniorV) {
        
        while (youngerV) {

          if (youngerAntecedent === this) {
            
            return this;
          }
          
          if (linkFromThePast === youngerAntecedent) {
            
            return linkFromThePast;
          }

          if (youngerAntecedent.creator) {
            youngerAntecedent = youngerAntecedent.creator;
          }
          youngerV--;
        }

        seniorV--;
        linkFromThePast = linkFromThePast.creator;
        counter--;
        youngerV = counter;
      }
    }

    if (!this.isMoreSeniorThan(vampire)) {
      let seniorV = vampire.numberOfVampiresFromOriginal;
      let youngerV = this.numberOfVampiresFromOriginal;
      let counter = youngerV;
      let linkFromThePast = vampire.creator;
      let youngerAntecedent = this.creator;
 
      while (seniorV) {
        
        while (youngerV) {

          if (youngerAntecedent === vampire) {
            
            return vampire;
          }
          
          if (linkFromThePast === youngerAntecedent) {
            
            return linkFromThePast;
          }

          if (youngerAntecedent.creator) {
            youngerAntecedent = youngerAntecedent.creator;
          }
          youngerV--;
        }

        seniorV--;
        linkFromThePast = linkFromThePast.creator;
        counter--;
        youngerV = counter;
      }
    }
  }
}

module.exports = Vampire;
