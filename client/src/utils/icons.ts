import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import {
  faCheck,
  faList,
  faClock,
  faPlus,
  faTrash,
  faPen,
  faUser,
  faGear,
  faHouse,
  faCalendar,
  faCircleExclamation,
  faCircleCheck,
  faXmark,
  faMagnifyingGlass,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

export const iconsMap: Record<string, IconDefinition> = {
  faCheck,
  faList,
  faClock,
  faPlus,
  faTrash,
  faPen,
  faUser,
  faGear,
  faHouse,
  faCalendar,
  faCircleExclamation,
  faCircleCheck,
  faXmark,
  faMagnifyingGlass,
  faChevronDown
};

export function getIcon(name: string): IconDefinition | undefined {
  return iconsMap[name];
}
