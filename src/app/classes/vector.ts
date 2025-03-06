export class Vector {
  public x: number;
  public y: number;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  add(v: any) {
    this.x += v.x;
    this.y += v.y;
    return this; // For chaining
  }

  subtract(v: any) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  scale(scalar: any) {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }

  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  magnitudeSquared() { // More efficient: returns magnitude without the square root
    return this.x * this.x + this.y * this.y;
  }

  normalize() {
    const mag = this.magnitude();
    if (mag !== 0) {
      this.x /= mag;
      this.y /= mag;
    }
    return this;
  }
}
