import { FilterResPipe } from 'app/pipes/ReservPipes/filter-res.pipe';

describe('FilterResPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterResPipe();
    expect(pipe).toBeTruthy();
  });
});
