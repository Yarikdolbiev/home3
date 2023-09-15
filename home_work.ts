class Department {
  name: string;
  domain: string;
  employees: Employee[];
  budget: { debit: number; credit: number };

  constructor(name: string, domain: string) {
    this.name = name;
    this.domain = domain;
    this.employees = [];
    this.budget = { debit: 0, credit: 0 };
  }

  calculateBalance(): number {
    return this.budget.debit - this.budget.credit;
  }

  addEmployee(employee: Employee) {
    this.employees.push(employee);
    this.budget.credit += employee.salary;
  }

  removeEmployee(employee: Employee) {
    const index = this.employees.indexOf(employee);
    if (index !== -1) {
      this.employees.splice(index, 1);
      this.budget.credit -= employee.salary;
    }
  }
}

class Company {
  name: string;
  departments: Department[];
  previousEmployees: PreviousHire[];
  employees: Employee[];

  constructor(name: string) {
    this.name = name;
    this.departments = [];
    this.previousEmployees = [];
    this.employees = [];
  }

  addDepartment(department: Department) {
    this.departments.push(department);
  }

  addPreviousEmployee(previousEmployee: PreviousHire) {
    this.previousEmployees.push(previousEmployee);
  }

  convertPreviousEmployeeToEmployee(previousEmployee: PreviousHire, department: Department) {
    const employee: Employee = {
      name: previousEmployee.name,
      surname: previousEmployee.surname,
      paymentInfo: previousEmployee.paymentInfo,
      salary: previousEmployee.paymentInfo.salary,
      status: 'active',
      department: department,
    };
    department.addEmployee(employee);
    this.employees.push(employee);
  }
}

class PreviousHire {
  name: string;
  surname: string;
  paymentInfo: PaymentInfo;

  constructor(name: string, surname: string, paymentInfo: PaymentInfo) {
    this.name = name;
    this.surname = surname;
    this.paymentInfo = paymentInfo;
  }
}

class Employee {
  name: string;
  surname: string;
  paymentInfo: PaymentInfo;
  salary: number;
  status: 'active' | 'inactive' | 'unpaidLeave';
  department: Department;

  constructor(
    name: string,
    surname: string,
    paymentInfo: PaymentInfo,
    salary: number,
    status: 'active' | 'inactive' | 'unpaidLeave',
    department: Department
  ) {
    this.name = name;
    this.surname = surname;
    this.paymentInfo = paymentInfo;
    this.salary = salary;
    this.status = status;
    this.department = department;
  }
}

class PaymentInfo {
  bankAccount: string;
  salary: number;

  constructor(bankAccount: string, salary: number) {
    this.bankAccount = bankAccount;
    this.salary = salary;
  }
}
class AccountingDepartment extends Department {
      constructor() {
        super('Accounting', 'Finance');
      }
  
      takeOnBalance(entity: Employee ) {
        this.budget.debit += entity.salary;
      }
  
      removeFromBalance(entity: Employee) {
        this.budget.debit -= entity.salary;
      }
  
      paySalaries(company: Company) {
        for (const employee of company.employees) {
          if (employee.status === 'active') {
            this.removeFromBalance(employee);
            
          }
        }
      }
    }

