/*
    @author Manasvi Jain
   This is a header file that is a part of PE2.c 
*/

#include <stdio.h>
#include <ctype.h>
#include <string.h>
#include <stdlib.h>

#define FILENAME "Files.txt"
#define OUTPUT_FILENAME "output.txt"

#define MAX_LENGHT 200  // maximum length a path or a file name is allowed to have
#define PATH_LENGTH 40
#define FILENAME_LENGTH 20

typedef struct fileStruct{
    char* path; 
    char* name;
} fileInfo;

char showMenu(void);
fileInfo* readFileInfo(void);
void addFiles(fileInfo*);
void findAndAddFiles(void);
void runAndCount(void);
void grade(void);
