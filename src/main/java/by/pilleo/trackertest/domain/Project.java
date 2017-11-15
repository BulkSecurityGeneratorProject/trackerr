package by.pilleo.trackertest.domain;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "Project")

public class Project {
    private Long id;
    private String projectDescription;
    private String projectName;
    private Set<User> users=new HashSet<>();
    private Set<Task> tasks = new HashSet<>();

    @ManyToMany(mappedBy = "projects")
    //@JsonIgnore
    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    public Project addUser(User user) {
        this.users.add(user);
        user.getProjects().add(this);
        return this;
    }

    public Project removeUser(User user) {
        this.users.remove(user);
        user.getProjects().remove(this);
        return this;
    }


    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy=GenerationType.IDENTITY)

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Project project = (Project) o;
        return id == project.id;
    }

    @Override
    public int hashCode() {

        return Objects.hash(id);
    }

    @OneToMany(mappedBy = "project")
    //@JsonIgnore
    public Set<Task> getTasks() {
        return tasks;
    }

    public void setTasks(Set<Task> tasksById) {
        this.tasks = tasksById;
    }



    @Basic
    @Column(name = "projectDescription", nullable = false, length = -1)
    public String getProjectDescription() {
        return projectDescription;
    }

    public void setProjectDescription(String projectDescription) {
        this.projectDescription = projectDescription;
    }

    @Basic
    @Column(name = "projectName", nullable = false, length = 450)
    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }
}
