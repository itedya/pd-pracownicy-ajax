function print_help() {
    printf "Available commands:\n"
    printf "    --help\n"
    printf "    --mysql-console\n"
    exit
}

if [ "$EUID" -ne 0 ]
then
    printf "Please run as root"
    exit
fi

if [ $1 = "" ]
then
    printf "Provide first argument!\n"
    print_help
    exit
elif [ $1 = "--help" ]
then
    print_help
elif [ $1 = "--mysql-console" ] 
then
    docker exec -it pracownicy-database mysql -uadministrator -p'pracownicy-password'
fi