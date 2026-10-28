import React, { FC } from 'react';
import { RiLockPasswordLine } from 'react-icons/ri';
import { AiOutlineLogout } from 'react-icons/ai';
import { FiUser } from 'react-icons/fi';

type Props = { user: any; active: number; avatar: string | null; setActive: (active: number) => void; logOutHandler: () => void; };

const SideBarProfile: FC<Props> = ({ user, active, setActive, logOutHandler }) => {
  const menus = [
    { id: 1, label: "Hồ sơ", icon: FiUser },
    { id: 2, label: "Bảo mật", icon: RiLockPasswordLine },
  ];

  return (
    <div className="flex flex-row md:flex-col gap-2 overflow-x-auto hide-scrollbar w-full pb-2 md:pb-0">
      {menus.map(m => {
        const Icon = m.icon;
        const isActive = active === m.id;
        return (
          <button key={m.id} onClick={() => setActive(m.id)} className={`flex items-center gap-2 md:gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm whitespace-nowrap shrink-0 ${isActive ? "bg-black text-white dark:bg-white dark:text-black" : "text-neutral-500 hover:bg-black/5 dark:hover:bg-white/5"}`}>
            <Icon size={18} /> {m.label}
          </button>
        )
      })}
      
      {user?.role && (
        <span className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 mt-0 md:mt-4">Vai trò: {user.role}</span>
      )}

      <button onClick={logOutHandler} className="flex items-center gap-2 md:gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm whitespace-nowrap shrink-0 text-red-500 hover:bg-red-500/10 mt-0 md:mt-4">
        <AiOutlineLogout size={18} /> Đăng xuất
      </button>
    </div>
  );
};

export default SideBarProfile;