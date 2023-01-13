/*
    @author Manasvi Jain
    My solution created for course EECS 2031 at York University. Problem designed by Professor Marzieh Ahmadzadeh.
    
    This program is a menu-based program that asks for information and processes the input using either C or Unix commands. The program intends to 
    compile a set of C files, and count the number of errors that they produce. This result is then printed into a file 
    This program demonstrates my ability to write and test code in C, working with structs and pointers in C, as well as my ability to develop and 
    test a shell script.
*/

//FINAL COPY

#include "PE2.h"
#include <stdio.h>
#include <stdlib.h>

/* In the main function several functions are called based on the output of calling showMenu in the main function. The menu will keep prompting the user
until they enter 4, where it will promptly exit.*/

void main() {
    // insert your code here
    int choice = 0;
    fileInfo* info;
    while (choice != 4){
        choice = showMenu();
        switch (choice) {
            case 1:
                info = readFileInfo();
                addFiles(info);
                break;

            case 2:
                findAndAddFiles();
                break;

            case 3:
                runAndCount();
                break;
        }
    }
}

/* This function shows a text-based menu as shown below. This function reads the user choice, which can be 1, 2, 3, and 4 and return the choice. 
It is assumed that users only enter integer numbers.*/

char showMenu(void){
    // insert your code here
    int choice;
    printf("1- Add a new file path and name to a file\n");
    printf("2- Add file names using Unix Command\n");
    printf("3- Run the programs and count the number of errors\n");
    printf("4- quit\n");
    printf("Enter your choice: ");
    scanf("%d", &choice);
    return (char) choice;
}

//The next 2 functions will be called if user enters 1.
/* This function gets a path name and a filename from a user and returns it in a form of a struct which is defined in PE2 header file (PE2.h).
This data is passed to addFiles.*/

fileInfo* readFileInfo(){
    //insert your code here
    fileInfo* info1;
    info1 = (fileInfo*) malloc (sizeof(fileInfo));
    info1->path = (char*) malloc (MAX_LENGHT);
    info1->name = (char*) malloc(MAX_LENGHT);
    char pathName [MAX_LENGHT];
    char fileName [MAX_LENGHT];
    printf("Enter File Path: ");
    scanf("%s", pathName);

    printf("Enter File name: ");
    scanf("%s", fileName);

    strcpy(info1->path, pathName);
    strcpy(info1->name, fileName);
    
    return info1;
}

/* After recieving the info passed from readFileInfo function this function will append the path name and file name into the file, whose name is given
in the header file (FILENAME). */

void addFiles(fileInfo* info){
    // insert your code here
    FILE* outFile = NULL;
    outFile = fopen(FILENAME, "a");
    if(outFile == NULL){
        printf("Could not open file.\n");
    }
    else{
        fprintf(outFile, "%s %s\n", info->path, info->name);
    }
    fclose(outFile);
}

//This function will be called if user enters 2 as input.
/* This function is required to find and count all the C programs in directories and subdirectories. We will accept three inputs, filename in which the 
paths will be recorded, starting of the path to be searched, and the depth that we want to search for. The function signature can be found in the header
file (PE2.h). */

void findAndAddFiles(){
    // insert your code here
    char recPaths [MAX_LENGHT]; //recorded paths
    char startPath [MAX_LENGHT]; //start paths
    int depth; //depth
    FILE* outFile = NULL; //since we are writing to a file we have to create another instance of the FILE pointer

    printf("Enter the filename in which the paths will be recorded: ");
    scanf("%s", recPaths);
    printf("Enter the starting path to be searched: ");
    scanf("%s", startPath);
    printf("Enter the depth of the path to be searched: ");
    scanf("%d", &depth);
    
    char command [MAX_LENGHT];
    outFile = fopen(recPaths, "w");
    if(outFile == NULL){
        printf("Could not open file");
    }
    else{
        sprintf(command, "find %s -maxdepth %d -name program.c > %s", startPath, depth, recPaths);
        system(command);
    }
}

//This function will execute when the user enters 3.
/* Function asks for name of the file, in which the path of C program is written. This function will read the content of this file line by line, compile
the program and count the number of compilation errors. The output will be written to a file, whose name is given in the header file (OUTPUT_FILENAME)
(PE2.h).*/

void runAndCount(void){
    // insert your code here
    char programNames[MAX_LENGHT];
    char command[MAX_LENGHT];
    char pathName[MAX_LENGHT];
    char character[10000];
    int numErrors = 0;

    printf("Enter the relative path of the file name contains the name of the programs: ");
    scanf("%s", programNames);
    FILE* executeFile = NULL;
    executeFile = fopen(programNames, "r");

    sprintf(command, "touch tempErrorFile.txt");
    system(command);

    if(executeFile == NULL){
        printf("Could not open file");
    }

    while(fscanf(executeFile, "%s", pathName) != EOF){
        sprintf(command, "gcc -o program %s 2> tempErrorFile.txt", pathName);
        system(command);
        sprintf(command, "./program");
        system(command);
        
        FILE* readFile = NULL;
        readFile = fopen("tempErrorFile.txt", "r"); 

        while (fgets(character,10000, readFile) != NULL){
            if((strstr(character, "error")) != NULL){
                numErrors++;
            }
        }

        if(numErrors != 0){
            numErrors--;
        }

        FILE* output = NULL;
        output = fopen(OUTPUT_FILENAME, "a");

        if(output == NULL){
            printf("Could not open file");
        }
        else{
            fprintf(output,"%s\t%d\n", pathName, numErrors);
        }
        numErrors = 0;
        fclose(output);
    }
    fclose(executeFile);

}
