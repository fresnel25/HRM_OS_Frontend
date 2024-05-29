import {
  ClockCircleOutlined,
  CheckOutlined,
  UsergroupDeleteOutlined,
  RocketOutlined,
  NotificationFilled,
  TrophyFilled,
  SubnodeOutlined,
  CalendarOutlined,
  FileDoneOutlined,
  PieChartFilled,
  FileOutlined,
  FlagFilled,
  HomeOutlined,
  SettingOutlined,
  UnorderedListOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  UserSwitchOutlined,
  WalletOutlined,
  FileSyncOutlined,
  FlagOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { disable } from "workbox-navigation-preload";
import getPermissions from "../../utils/getPermissions";
import getUserFromToken from "../../utils/getUserFromToken";
import logo from "../../assets/images/sai-i-lama-logo.png";
// import styles from "./Sidenav.module.css";

const Sidenav = ({ color, sideNavOpenKeys }) => {
  const user = getUserFromToken();
  const permissions = getPermissions();
  const hasPermission = (item) => {
    return permissions?.includes(item ? item : "");
  };
  // console.log("haspermission", hasPermission("create-user"));
  const menu = [
    {
      label: (
        <NavLink to="/admin/dashboard">
          <span>Dashboard</span>
        </NavLink>
      ),
      key: "dashboard",
      icon: <HomeOutlined />,
    },

    (hasPermission("create-user") ||
      hasPermission("readAll-user") ||
      hasPermission("readAll-role") ||
      hasPermission("readAll-designation") ||
      hasPermission("readAll-department")) && {
      label: "HR",
      key: "hr",
      icon: <UserOutlined />,
      children: [
        hasPermission("create-user") && {
          label: (
            <NavLink to="/admin/hr/staffs/new">
              <span>Nouvel employé</span>
            </NavLink>
          ),

          key: "staffs",
          icon: <UsergroupAddOutlined />,
        },
        hasPermission("readAll-user") && {
          label: (
            <NavLink to="/admin/hr/staffs">
              <span>Liste des employés</span>
            </NavLink>
          ),
          key: "users",
          icon: <UsergroupAddOutlined />,
        },
        hasPermission("readAll-role") && {
          label: (
            <NavLink to="/admin/role">
              <span>Role & Permissions</span>
            </NavLink>
          ),
          key: "roleAndPermissions",
          icon: <UserSwitchOutlined />,
        },
        hasPermission("readAll-designation") && {
          label: (
            <NavLink to="/admin/designation/">
              <span>Designation</span>
            </NavLink>
          ),
          key: "designation",
          icon: <UserSwitchOutlined />,
        },
        hasPermission("readAll-department") && {
          label: (
            <NavLink to="/admin/department">
              <span>Department</span>
            </NavLink>
          ),
          key: "department",
          icon: <UserSwitchOutlined />,
        },
      ],
    },

    (hasPermission("create-attendance") ||
      hasPermission("readAll-attendance")) && {
      label: "PRÉSENCE",
      key: "attendance",
      icon: <ClockCircleOutlined />,
      children: [
        hasPermission("create-attendance") && {
          label: (
            <NavLink to="/admin/attendance">
              <span>Présence</span>
            </NavLink>
          ),
          key: "attendance",
          icon: <FileDoneOutlined />,
        },
        hasPermission("readSingle-attendance") && {
          label: (
            <NavLink to={`/admin/attendance/user/${user}`}>
              <span>Ma présence</span>
            </NavLink>
          ),
          key: "myAttendance",
          icon: <FileDoneOutlined />,
        },
      ],
    },

    (hasPermission("create-payroll") || hasPermission("readAll-payroll")) && {
      label: "PAIEMENT",
      key: "payroll",
      icon: <WalletOutlined />,
      children: [
        hasPermission("create-payroll") && {
          label: (
            <NavLink to="/admin/payroll/new">
              <span>Calculer la paie</span>
            </NavLink>
          ),
          key: "calculatePayroll",
          icon: <FileDoneOutlined />,
        },
        hasPermission("readAll-payroll") && {
          label: (
            <NavLink to="/admin/payroll/list">
              <span>Liste des fiches de paie</span>
            </NavLink>
          ),
          key: "payslipList",
          icon: <FileOutlined />,
        },
      ],
    },

    hasPermission("readAll-shift") && {
      label: "PÉRIODE DE TRAVAIL",
      key: "shift",
      icon: <ClockCircleOutlined />,
      children: [
        hasPermission("readAll-shift") && {
          label: (
            <NavLink to="/admin/shift">
              <span>Changement</span>
            </NavLink>
          ),
          key: "newShift",
          icon: <FileDoneOutlined />,
        },
      ],
    },

    hasPermission("readAll-employmentStatus") && {
      label: "Statut de l'employé",
      key: "employementStatus",
      icon: <RocketOutlined />,
      children: [
        hasPermission("readAll-employmentStatus") && {
          label: (
            <NavLink to="/admin/employment-status">
              <span>Status</span>
            </NavLink>
          ),
          key: "employementStatus",
          icon: <FileDoneOutlined />,
        },
      ],
    },

    (hasPermission("create-leaveApplication") ||
      hasPermission("readAll-leaveApplication") ||
      hasPermission("readSingle-leaveApplication")) && {
      label: "CONGÉ",
      key: "leave",
      icon: <UsergroupDeleteOutlined />,
      children: [
        hasPermission("create-leaveApplication") && {
          label: (
            <NavLink to="/admin/leave/new">
              <span> Nouveau congé </span>
            </NavLink>
          ),
          key: "newLeave",
          icon: <SubnodeOutlined />,
        },
        hasPermission("readAll-leaveApplication") && {
          label: (
            <NavLink to="/admin/leave">
              <span>Statut de congé</span>
            </NavLink>
          ),
          key: "leaveStatus",
          icon: <FileDoneOutlined />,
        },
        hasPermission("readSingle-leaveApplication") && {
          label: (
            <NavLink to={`/admin/leave/user/${user}`}>
              <span>Mon congé</span>
            </NavLink>
          ),
          key: "myLeaves",
          icon: <FileDoneOutlined />,
        },
      ],
    },

    (hasPermission("readAll-weeklyHoliday") ||
      hasPermission("readAll-publicHoliday")) && {
      label: "HOLIDAY",
      key: "holiday",
      icon: <CalendarOutlined />,
      children: [
        hasPermission("readAll-weeklyHoliday") && {
          label: (
            <NavLink to="/admin/holiday/week">
              <span>Vacances hebdomadaires</span>
            </NavLink>
          ),
          key: "weeklyHoliday",
          icon: <PieChartFilled />,
        },
        hasPermission("readAll-publicHoliday") && {
          label: (
            <NavLink to="/admin/holiday/public">
              <span>Jour férié</span>
            </NavLink>
          ),
          key: "publicHoliday",
          icon: <PieChartFilled />,
        },
      ],
    },

    // hasPermission("readAll-leavePolicy") && {
    // 	label: "LEAVE POLICY",
    // 	key: "leavePolicy",
    // 	icon: <CalendarOutlined />,
    // 	children: [
    // 		hasPermission("readAll-leavePolicy") && {
    // 			label: (
    // 				<NavLink to='/admin/leave-policy'>
    // 					<span>Politique de congé</span>
    // 				</NavLink>
    // 			),
    // 			key: "leavePolicy",
    // 			icon: <PieChartFilled />,
    // 		},
    // 	],
    // },

    hasPermission("readAll-announcement") && {
      label: "ANNONCE",
      key: "announcement",
      icon: <NotificationFilled />,
      children: [
        hasPermission("readAll-announcement") && {
          label: (
            <NavLink to="/admin/announcement">
              <span>Annonce</span>
            </NavLink>
          ),
          key: "newLeave",
          icon: <FlagFilled />,
        },
      ],
    },

    // (hasPermission("readAll-account") ||
    // 	hasPermission("readAll-transaction") ||
    // 	hasPermission("create-transaction")) && {
    // 	label: "ACCOUNTS",
    // 	key: "accounts",
    // 	icon: <WalletOutlined />,
    // 	children: [
    // 		hasPermission("readAll-account") && {
    // 			label: (
    // 				<NavLink to='/admin/account/'>
    // 					<span>Compte</span>
    // 				</NavLink>
    // 			),
    // 			key: "accountList",
    // 			icon: <UnorderedListOutlined />,
    // 		},
    // 		hasPermission("create-transaction") && {
    // 			label: (
    // 				<NavLink to='/admin/transaction/create'>
    // 					<span>Nouvelle opération</span>
    // 				</NavLink>
    // 			),
    // 			key: "newTransaction",
    // 			icon: <CheckOutlined />,
    // 		},
    // 		hasPermission("readAll-transaction") && {
    // 			label: (
    // 				<NavLink to='/admin/transaction/'>
    // 					<span>Transaction List</span>
    // 				</NavLink>
    // 			),
    // 			key: "transactionList",
    // 			icon: <UnorderedListOutlined />,
    // 		},
    // 	],
    // },

    hasPermission("readAll-account") && {
      label: "FINANCE",
      key: "report",
      icon: <FlagOutlined />,
      children: [
        hasPermission("readAll-account") && {
          label: (
            <NavLink to="/admin/account/trial-balance">
              <span>Balance de vérification</span>
            </NavLink>
          ),
          key: "trialBalance",
          icon: <FileDoneOutlined />,
        },
        hasPermission("readAll-account") && {
          label: (
            <NavLink to="/admin/account/balance-sheet">
              <span>Bilan</span>
            </NavLink>
          ),
          key: "balanceSheet",
          icon: <FileOutlined />,
        },
        hasPermission("readAll-account") && {
          label: (
            <NavLink to="/admin/account/income">
              <span>releve de revenue</span>
            </NavLink>
          ),
          key: "incomeStatement",
          icon: <FileSyncOutlined />,
        },
      ],
    },

    (hasPermission("crate-award") || hasPermission("readAll-award")) && {
      label: "PRIX",
      key: "award",
      icon: <TrophyFilled />,
      children: [
        hasPermission("create-award") && {
          label: (
            <NavLink to="/admin/award/new">
              <span>Nouveau prix</span>
            </NavLink>
          ),
          key: "newAward",
          icon: <TrophyFilled />,
        },

        hasPermission("readAll-award") && {
          label: (
            <NavLink to="/admin/award">
              <span>Prix</span>
            </NavLink>
          ),
          key: "award",
          icon: <TrophyFilled />,
        },
      ],
    },

    (hasPermission("create-project") ||
      hasPermission("readAll-project") ||
      hasPermission("create-projectTeam") ||
      hasPermission("create-milestone") ||
      hasPermission("readAll-priority") ||
      hasPermission("create-task-Status")) && {
      label: "PROJET",
      key: "project",
      icon: <SettingOutlined />,
      children: [
        hasPermission("create-project") && {
          label: (
            <NavLink to="/admin/project/new">
              <span>Ajouter un projet</span>
            </NavLink>
          ),
          key: "project",
          icon: <SettingOutlined />,
        },
        hasPermission("readAll-project") && {
          label: (
            <NavLink to="/admin/project">
              <span>Ajouter un projet</span>
            </NavLink>
          ),
          key: "allProject",
          icon: <SettingOutlined />,
        },
        hasPermission("create-projectTeam") && {
          label: (
            <NavLink to="/admin/team">
              <span>Équipe</span>
            </NavLink>
          ),
          key: "team",
          icon: <SettingOutlined />,
        },
        (hasPermission("create-priority") ||
          hasPermission("readAll-priority")) && {
          label: (
            <NavLink to="/admin/task-priority">
              <span>Priorité des tâches</span>
            </NavLink>
          ),
          key: "taskPriority",
          icon: <SettingOutlined />,
        },
        hasPermission("create-milestone") && {
          label: (
            <NavLink to="/admin/milestone">
              <span>Ajouter un jalon</span>
            </NavLink>
          ),
          key: "milestone",
          icon: <SettingOutlined />,
        },

        hasPermission("create-taskStatus") && {
          label: (
            <NavLink to="/admin/task-status">
              <span>Ajouter le statut d'une tâche</span>
            </NavLink>
          ),
          key: "taskStatus",
          icon: <SettingOutlined />,
        },
      ],
    },

    hasPermission("readAll-setting") && {
      label: "PARAMÈTRES",
      key: "settings",
      icon: <SettingOutlined />,
      children: [
        hasPermission("readAll-setting") && {
          label: (
            <NavLink to="/admin/company-setting">
              <span>Paramètres de l'entreprise</span>
            </NavLink>
          ),
          key: "invoiceSetting",
          icon: <SettingOutlined />,
        },
      ],
    },
  ];

  return (
    <div>
      <center>
        <img
          src={logo}
          alt="logo"
          style={{
            width: "50%",
            height: "50%",
            objectFit: "cover",
          }}
        />
        <Menu
          theme="dark"
          mode="inline"
          items={menu}
          className="sidenav-menu "
          // openKeys={[sideNavOpenKeys]}
          // style={{ backgroundColor: "transparent" }}
        />
      </center>
    </div>
  );
};

export default Sidenav;
