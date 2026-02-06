# 🔧 Quick TypeScript Fixes Needed

There are a few more controller files with the same parameter type issue. Here's exactly what to change in each file:

## Files to Fix:

### 1. `src/controllers/member.controller.ts`

Replace these lines:
```typescript
Line 21:  const { communityId } = req.params;
Line 55:  const { communityId, memberId } = req.params;
Line 89:  const { communityId, memberId } = req.params;
Line 176: const { communityId, memberId } = req.params;
Line 212: const { communityId, memberId } = req.params;
Line 246: const { communityId, memberId } = req.params;
Line 285: const { communityId, memberId } = req.params;
Line 311: const { communityId, memberId } = req.params;
Line 345: const { communityId, memberId } = req.params;
Line 374: const { communityId } = req.params;
```

**With:**
```typescript
const communityId = req.params.communityId as string;
const memberId = req.params.memberId as string; // where applicable
```

### 2. `src/controllers/chat.controller.ts`

Similar pattern - replace:
```typescript
const { communityId } = req.params;
const { channelId } = req.params;
const { messageId } = req.params;
```

**With:**
```typescript
const communityId = req.params.communityId as string;
const channelId = req.params.channelId as string;
const messageId = req.params.messageId as string;
```

### 3. `src/controllers/challenge.controller.ts`

Replace:
```typescript
const { id } = req.params;
const { submissionId } = req.params;
```

**With:**
```typescript
const id = req.params.id as string;
const submissionId = req.params.submissionId as string;
```

### 4. `src/controllers/dm.controller.ts`

Replace:
```typescript
const { userId } = req.params;
const { conversationId } = req.params;
const { messageId } = req.params;
```

**With:**
```typescript
const userId = req.params.userId as string;
const conversationId = req.params.conversationId as string;
const messageId = req.params.messageId as string;
```

### 5. `src/controllers/creator.controller.ts`

Replace:
```typescript
const { id } = req.params;
const { userId } = req.params;
```

**With:**
```typescript
const id = req.params.id as string;
const userId = req.params.userId as string;
```

## Quick Fix Pattern:

**Find:** `const { X } = req.params;`  
**Replace:** `const X = req.params.X as string;`

**Find:** `const { X, Y } = req.params;`  
**Replace:** `const X = req.params.X as string; const Y = req.params.Y as string;`

## After Fixing:

Once all files are fixed, just save them and the server will automatically restart.

The errors will disappear and your backend will be running! 🚀
