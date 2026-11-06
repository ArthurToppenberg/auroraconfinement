// Server only: imported solely by app/api/register/route.ts.
import { createLoi, prisma } from '@aurora/db';
import { contactEmail, siteOrigin } from '@/content/site';
import { RateLimiter } from '@/lib/http';
import { handleRegisterPost } from '@/lib/loi/handler';

// 3 letters per client and 40 in total per 10 minutes. Held in memory only.
const limiter = new RateLimiter(3, 40, 10 * 60 * 1000);

export const registerRoute = (request: Request): Promise<Response> =>
  handleRegisterPost(request, {
    insert: async (loi) => {
      await createLoi(prisma, { ...loi });
    },
    limiter,
    siteOrigin,
    contactEmail,
  });
