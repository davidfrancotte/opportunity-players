'use client';
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from 'react';
import {
  initialPosts,
  initialProfile,
  type DemoPost,
  type DemoProfile,
} from '@/lib/member-data';
type DemoMessage = { body: string; mine: boolean };
type State = {
  followed: string[];
  setFollowed: Dispatch<SetStateAction<string[]>>;
  saved: string[];
  setSaved: Dispatch<SetStateAction<string[]>>;
  liked: string[];
  setLiked: Dispatch<SetStateAction<string[]>>;
  posts: DemoPost[];
  setPosts: Dispatch<SetStateAction<DemoPost[]>>;
  profile: DemoProfile;
  setProfile: Dispatch<SetStateAction<DemoProfile>>;
  read: string[];
  setRead: Dispatch<SetStateAction<string[]>>;
  messages: Record<string, DemoMessage[]>;
  setMessages: Dispatch<SetStateAction<Record<string, DemoMessage[]>>>;
  preferences: Record<string, boolean>;
  setPreferences: Dispatch<SetStateAction<Record<string, boolean>>>;
  notice: string;
  announce: (s: string) => void;
};
const DemoContext = createContext<State | null>(null);
export function DemoProvider({ children }: { children: ReactNode }) {
  const [followed, setFollowed] = useState(['alex-dupont']);
  const [saved, setSaved] = useState<string[]>([]);
  const [liked, setLiked] = useState<string[]>([]);
  const [posts, setPosts] = useState(initialPosts);
  const [profile, setProfile] = useState(initialProfile);
  const [read, setRead] = useState<string[]>([]);
  const [messages, setMessages] = useState<Record<string, DemoMessage[]>>({});
  const [preferences, setPreferences] = useState<Record<string, boolean>>({
    messages: true,
    publications: true,
    opportunites: true,
    marketing: false,
  });
  const [notice, setNotice] = useState('');
  return (
    <DemoContext.Provider
      value={{
        followed,
        setFollowed,
        saved,
        setSaved,
        liked,
        setLiked,
        posts,
        setPosts,
        profile,
        setProfile,
        read,
        setRead,
        messages,
        setMessages,
        preferences,
        setPreferences,
        notice,
        announce: setNotice,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
}
export function useDemo() {
  const value = useContext(DemoContext);
  if (!value) throw new Error('DemoProvider is required');
  return value;
}
export function toggleItem(items: string[], id: string) {
  return items.includes(id) ? items.filter((x) => x !== id) : [...items, id];
}
