import { MilisToMinutesPipe } from './milis-to-minutes.pipe';

describe('MilisToMinutesPipe', () => {
  it('create an instance', () => {
    const pipe = new MilisToMinutesPipe();
    expect(pipe).toBeTruthy();
  });
});
