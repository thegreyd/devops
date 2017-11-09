## steps
- clone repo
- `pip install --user git+git://github.com/ansible/ansible.git@devel` install latest ansible
- `vars/password.yml` Ansible vault file with (ec2, jenkins, mongo..) credentials
- `~/password.txt` File with your vault password
- Run `ansible-playbook main.yml --vault-password-file ~/password.txt`

## Check
- `ip:8080` access jenkins
- `ip` access checkbox
- `ip:9090/iTrust-23.0.0` access iTrust

## Debug
- `ssh -i <pem_file> ubuntu@ip` ssh into amazon machine
- `/var/lib/jenkins` files on jenkins server - deployment playbooks and jobs
- `ansible-vault view <vault_file>`
- `ansible-vault edit <vault_file>`

## Todo
- separate provision tasks into playbook
    + `provision.yml` provision 3 ec2 instances and write them to var file
        * jenkins
        * itrust
        * checkbox
    + `main.yml` create jenkins server, deploy checkbox and itrust. reads from the var file to create inventory