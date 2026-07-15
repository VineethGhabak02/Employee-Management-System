import java.util.*;
class EmployManaSys {
    
   static class employee {
    String name;
    long code;
    String designation;
    int exp;
    int age;
    
   } 
   static int num;
   static int max = 20;

   //Array of Employee
   static employee emp[] = new employee[max];
   static employee tempemp[] = new employee[max];
   static employee sortemp[] = new employee[max];
   static employee sortemp1[] = new employee[max];
   static Scanner sc = new Scanner(System.in);

   static void build()
   {
    System.out.println("Build The Table\n");
    System.out.println("Maximum Entries can be " + max);
    System.out.println("Enter the number of " + "Entries required");
    num = sc.nextInt();

    if (num > 20){
        System.out.println("Maximum number of " + " Entries are 20");
        num = 20;
    }
    System.out.println("Enter the following data: ");

    for (int i = 0; i < num; i++){
        emp[i] = new employee();

        System.out.print("Name");
        emp[i].name = sc.next();

        System.out.print("Employee ID ");
        emp[i].code = sc.nextLong();

        System.out.print("Designation ");
        emp[i].designation = sc.next();

        System.out.print("Experience ");
        emp[i].exp = sc.nextInt();

        System.out.print("Age ");
        emp[i].age = sc.nextInt();

    }
     showMenu();
   }
   // function to insert the data
   static void insert()
   {

    if (num < max) {
        int i = num;
        num++;

        emp[i] = new employee();
    
        System.out.print("Enter the information " + "of the employee");
        System.out.print("Name ");
        emp[i].name = sc.next();

        System.out.print("Employee ID ");
        emp[i].code = sc.nextLong();

        System.out.print("Designation ");
        emp[i].designation = sc.next();

        System.out.print("Experience ");
        emp[i].exp = sc.nextInt();

        System.out.print("Age ");
        emp[i].age = sc.nextInt();
    }
    else {
        System.out.println("Employee Table Full");
    }
    showMenu();
}
   
   //function to dlt record

   static void deleteIndex(int i)
    {
        for ( int j = i; j < num - 1; j++){
            emp[j].name = emp[j + 1].name;
            emp[j].code = emp[j + 1].code;
            emp[j].designation = emp[j + 1].designation;
            emp[j].exp = emp[j + 1].exp;
            emp[j].age = emp[j + 1].age;
        }
        return;
    }   

    static void deleteRecord()
    {
    System.out.println("Enter the Employee ID " + "to Delete Record");   
    
        int code = sc.nextInt();
        boolean found = false;
        for (int i = 0; i < num; i++){
            if (emp[i].code == code) {
               found = true; 
            deleteIndex(i);
            emp[num-1] = null;
            num--;
            break;
            }
        }
        if(!found){
    System.out.println("Employee Not Found");
}
       showMenu();
   }
   
   static void searchRecord()
   {
    System.out.println("Enter the Employee " + "ID to search Record");

    int code = sc.nextInt();
    boolean found = false;
    for (int i = 0; i < num; i++){
        
        if (emp[i].code == code){
            found = true;
            System.out.println("Name "+ emp[i].name);
            System.out.println("Employee ID "+ emp[i].code);
            System.out.println("Designation "+ emp[i].designation);
            System.out.println("Experience "+ emp[i].exp);
            System.out.println("Age " + emp[i].age);
            break;
        }
    }
    if(!found){
    System.out.println("Employee Not Found");
}
    showMenu();
   }

   //Function to show Menu
   static void showMenu()
   {
    System.out.println("-------------------------"
         + " Employee Management System"
         + "-------------------------\n");

    System.out.println("Available Options:\n");
    System.out.print("Build Table         (1)\n");
    System.out.print("Insert New Entry    (2)\n");
    System.out.print("Delete Entry        (3)\n");
    System.out.print("Search a Record     (4)\n");
    System.out.print("Exit                (5)\n");

    int option = sc.nextInt();

    // Input Options
    // Call function on the basis of the
    // above option
    if (option == 1) {
        build();
    }
    else if (option == 2) {
        insert();
    }
    else if (option == 3) {
        deleteRecord();
    }
    else if (option == 4) {
        searchRecord();
    }
    else if (option == 5) {
        return;
    }
    else {
        System.out.println("Expected Options" + " are 1/2/3/4/5");
        showMenu();
    }
}
    public static void main(String[] args) {
        showMenu();

    }
   }

