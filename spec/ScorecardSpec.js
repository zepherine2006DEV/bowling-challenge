describe("Scorecard", function() {
  var scorecard;

  beforeEach(function() {
    scoreCard = new Scorecard();
  });

  describe("#updateScore", function(){
    it("should be able to update the score", function() {
      scoreCard.updateScore(2);
      expect(scoreCard.getRunningTotal()).toEqual(2);
    });

    it("should be able to update the score in frame 10 when 3 strikes are made", function() {
      scoreCard.nextFrame = 10;
      scoreCard.nextRoll = 1;
      scoreCard.updateScore(10);
      scoreCard.updateScore(10);
      scoreCard.updateScore(10);
      expect(scoreCard.getRunningTotal()).toEqual(30);
    });

    it("should not update the score past the end of the game, with no strikes or spares in the last frame", function() {
      scoreCard.nextFrame = 10;
      scoreCard.nextRoll = 1;
      scoreCard.updateScore(3);
      scoreCard.updateScore(5);
      scoreCard.updateScore(6);
      expect(scoreCard.getRunningTotal()).toEqual(8);
    });

    it("should not update the score past the end of the game, with a strike in the last frame", function() {
      scoreCard.nextFrame = 10;
      scoreCard.nextRoll = 1;
      scoreCard.updateScore(10);
      scoreCard.updateScore(3);
      scoreCard.updateScore(6);
      scoreCard.updateScore(5);
      expect(scoreCard.getRunningTotal()).toEqual(19);
    });

    it("should not update the score past the end of the game, with a spare in the last frame", function() {
      scoreCard.nextFrame = 10;
      scoreCard.nextRoll = 1;
      scoreCard.updateScore(8);
      scoreCard.updateScore(2);
      scoreCard.updateScore(6);
      scoreCard.updateScore(5);
      expect(scoreCard.getRunningTotal()).toEqual(16);
    });

     it("should return END when the last roll has already happened", function() {
      scoreCard.nextFrame = 10;
      scoreCard.nextRoll = 1;
      scoreCard.updateScore(8);
      scoreCard.updateScore(1);
      expect(scoreCard.updateScore(3)).toEqual("END");
    });

    it("should set the number of the next frame and roll correctly when first roll of frame is not a strike in first frame", function() {
      scoreCard.updateScore(2);
      expect(scoreCard.nextFrame).toEqual(1);
      expect(scoreCard.nextRoll).toEqual(2);
    });

    it("should set the number of the next frame and roll correctly when first roll of frame is a strike in the first frame", function() {
      scoreCard.updateScore(10);
      expect(scoreCard.nextFrame).toEqual(2);
      expect(scoreCard.nextRoll).toEqual(1);
    });

    it("should set the number of the next frame and roll correctly when in frame 10 when there is a strike", function() {
      scoreCard.nextFrame = 10;
      scoreCard.nextRoll = 1;
      scoreCard.updateScore(10);
      expect(scoreCard.nextFrame).toEqual(10);
      expect(scoreCard.nextRoll).toEqual(2);
    });

     it("should set the number of the next roll to 3 when in frame 10, there is a strike in roll 1, and roll 2 is being updated", function() {
      scoreCard.nextFrame = 10;
      scoreCard.nextRoll = 1;
      scoreCard.updateScore(10);
      scoreCard.updateScore(10);
      expect(scoreCard.nextFrame).toEqual(10);
      expect(scoreCard.nextRoll).toEqual(3);
    });
  });

  describe("#calculateBonusForFrame", function() {
    it("should be able to calculate the bonus for a frame with a strike then a round without a strike", function() {
      scoreCard.updateScore(10);
      scoreCard.updateScore(3);
      scoreCard.updateScore(4);
      expect(scoreCard.calculateBonusForFrame(1)).toEqual(7);
    });

    it("should be able to calculate the bonus for a frame with no strikes or spares", function() {
      scoreCard.updateScore(2);
      scoreCard.updateScore(5);
      scoreCard.updateScore(3);
      scoreCard.updateScore(4);
      expect(scoreCard.calculateBonusForFrame(1)).toEqual(0);
    });

    it("should be able to calculate the bonus for a frame with a spare", function() {
      scoreCard.updateScore(5);
      scoreCard.updateScore(5);
      scoreCard.updateScore(3);
      scoreCard.updateScore(4);
      expect(scoreCard.calculateBonusForFrame(1)).toEqual(3);
    });
  });

  describe("#getRunningTotal", function() {
    it("should be able to calculate the total for a game of 10 frames with no strikes or spares", function() {
      scoreCard.updateScore(1);
      scoreCard.updateScore(2);
      scoreCard.updateScore(1);
      scoreCard.updateScore(2);
      scoreCard.updateScore(1);
      scoreCard.updateScore(2);
      scoreCard.updateScore(1);
      scoreCard.updateScore(2);
      scoreCard.updateScore(1);
      scoreCard.updateScore(2);
      scoreCard.updateScore(1);
      scoreCard.updateScore(2);
      scoreCard.updateScore(1);
      scoreCard.updateScore(2);
      scoreCard.updateScore(1);
      scoreCard.updateScore(2);
      scoreCard.updateScore(1);
      scoreCard.updateScore(2);
      scoreCard.updateScore(1);
      scoreCard.updateScore(2);
      expect(scoreCard.getRunningTotal()).toEqual(30);
    });
  });
});
