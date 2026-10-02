import { cookies } from 'next/headers';

/**
 * Checks whether access to /studio is enabled.
 * 
 * Evaluation order:
 * 1. Secret Access Bypass: If cookie or query matches STUDIO_ACCESS_KEY, access is granted.
 * 2. Vercel Edge Config: If EDGE_CONFIG is set, reads 'enable_studio' flag instantly.
 * 3. Environment Variable: Checks ENABLE_STUDIO (or NEXT_PUBLIC_ENABLE_STUDIO). Default is true if unset.
 */
export async function isStudioAccessEnabled(searchParams?: { [key: string]: string | string[] | undefined }): Promise<boolean> {
  const secretKey = process.env.STUDIO_ACCESS_KEY;

  // 1. Check query parameter bypass (e.g. /studio?access=ff-studio-access-2026 or ?key=...)
  const queryKey = searchParams?.access || searchParams?.key;
  if (secretKey && queryKey && (queryKey === secretKey)) {
    return true;
  }

  // 2. Check bypass cookie
  try {
    const cookieStore = await cookies();
    const cookieKey = cookieStore.get('studio_access_token')?.value;
    if (secretKey && cookieKey === secretKey) {
      return true;
    }
  } catch {
    // cookies() might not be available in all contexts, ignore
  }

  // 3. Check Vercel Edge Config (if configured in Vercel project)
  if (process.env.EDGE_CONFIG) {
    try {
      const { get } = await import('@vercel/edge-config');
      const edgeFlag = await get<boolean>('enable_studio');
      if (typeof edgeFlag === 'boolean') {
        return edgeFlag;
      }
    } catch (err) {
      console.warn('Could not read from Edge Config, falling back to env var:', err);
    }
  }

  // 4. Check Environment Variable
  const envFlag = process.env.ENABLE_STUDIO ?? process.env.NEXT_PUBLIC_ENABLE_STUDIO;
  if (envFlag !== undefined) {
    return envFlag.toLowerCase() === 'true' || envFlag === '1';
  }

  // Default to enabled if not configured
  return true;
}
