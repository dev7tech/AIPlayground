'use client';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from '@nextui-org/navbar';
import { Link } from '@nextui-org/link';
import { Button } from '@nextui-org/button';
import { ThemeSwitcher } from './ThemeSwitcher';

export const NavBar = () => {
  const menuItems = [
    {
      name: 'Glasses',
      link: '/image',
    },
    {
      name: 'Chat',
      link: '/chat',
    },
  ];

  return (
    <Navbar isBlurred maxWidth='xl'>
      <NavbarContent className='sm:hidden' justify='start'>
        <NavbarMenuToggle />
      </NavbarContent>
      <NavbarContent className='sm:hidden pr-3' justify='center'>
        <NavbarBrand>
          <Button as={Link} href='/' variant='light'>
            <span className='font-bold text-inherit text-lg'>DevTech</span>
          </Button>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className='hidden sm:flex gap-5' justify='start'>
        <NavbarBrand>
          <Button as={Link} href='/' variant='light'>
            <span className='font-bold text-2xl flex gap-3 justify-center items-center'>
              DevTech
            </span>
          </Button>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className='hidden sm:flex' justify='center'>
        <NavbarItem>
          <Button as={Link} href='/image' variant='light'>
            Glasses
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} href='/chat' variant='light'>
            Chat
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify='end'>
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className='w-full'
              href={item.link}
              size='lg'
              color='foreground'
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};
