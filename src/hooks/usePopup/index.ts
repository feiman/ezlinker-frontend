import { DrawerProps } from 'antd/lib/drawer';
import usePopupBox from './libs/usePopupBox';
import useFormPopupBox from './libs/useFormPopupBox';
import { IFormPopupBoxOption } from './type';
import { IAction } from '@/typings/global';
import { IUseResuful } from '../useRestful/useRestful';

const useFormModal = <ContentProps, UseResufulType = any>(
  FormModalContent: React.FC<ContentProps>,
  action: IAction | string | IUseResuful<UseResufulType>,
  opt: IFormPopupBoxOption = {},
) => useFormPopupBox(FormModalContent, action, opt, 'Modal');

const useFormDrawer = <ContentProps, UseResufulType = any>(
  FormDrawerContent: React.FC<ContentProps>,
  action: IAction | string | IUseResuful<UseResufulType>,
  opt: IFormPopupBoxOption = {},
) => useFormPopupBox(FormDrawerContent, action, opt, 'Drawer');

const useModal = <ContentProps>(
  ModalContent: React.FC<ContentProps>,
  ModalPropsDefault: DrawerProps = {},
) => usePopupBox(ModalContent, ModalPropsDefault, 'Modal');

const useDrawer = <ContentProps>(
  ModalContent: React.FC<ContentProps>,
  DrawerPropsDefault: DrawerProps = {},
) => usePopupBox(ModalContent, DrawerPropsDefault, 'Drawer');

export { useFormModal, useFormDrawer, useModal, useDrawer };
