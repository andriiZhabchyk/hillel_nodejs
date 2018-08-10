import { PostStateModule } from './post-state.module';

describe('PostStateModule', () => {
  let postStateModule: PostStateModule;

  beforeEach(() => {
    postStateModule = new PostStateModule();
  });

  it('should create an instance', () => {
    expect(postStateModule).toBeTruthy();
  });
});
