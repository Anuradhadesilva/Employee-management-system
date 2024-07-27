package com.example.employee.service;

import com.example.employee.entity.Employee;
import com.example.employee.repository.EmployeeRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EmployeeService {
    private final EmployeeRepository employeeRepository;

    public Employee createEmployee(Employee employee){
        return employeeRepository.save(employee);
    }

    public List<Employee> getAllEmployees(){
        return employeeRepository.findAll();
    }

    public void deleteEmplyee(Long id){
        if(!employeeRepository.existsById(id)){
            throw new EntityNotFoundException("Employee with id" + id + "not found");
        }
        employeeRepository.deleteById(id);
    }

    public Employee employeeById(Long id){
        return employeeRepository.findById(id).orElse(null);
    }


    public Employee updateEmployee(Long id ,Employee employee){
        Optional<Employee> optionalEmployee = employeeRepository.findById(id);
        if(optionalEmployee.isPresent()){
            Employee upadatedEmployee = optionalEmployee.get();
            upadatedEmployee.setEmail(employee.getEmail());
            upadatedEmployee.setName(employee.getName());
            upadatedEmployee.setPhone(employee.getPhone());
            upadatedEmployee.setDepartment(employee.getDepartment());

            return employeeRepository.save(upadatedEmployee);
        }
        return  null;
    }

}
