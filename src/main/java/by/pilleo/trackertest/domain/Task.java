package by.pilleo.trackertest.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * not an ignored comment
 */
@ApiModel(description = "not an ignored comment")
@Entity
@Table(name = "Task")
public class Task implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "taskName")
    private String taskName;

    @Column(name = "taskDescr")
    private String taskDescr;

    @OneToMany(mappedBy = "task")
    @JsonIgnore
    private Set<Comment> comments = new HashSet<>();

    @OneToOne(mappedBy = "task")
    @JsonIgnore
    private Status status;

    @ManyToOne
    private Project project;

    @ManyToMany(mappedBy = "tasks")
    @JsonIgnore
    private Set<User> users = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTaskName() {
        return taskName;
    }

    public Task taskName(String taskName) {
        this.taskName = taskName;
        return this;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public String getTaskDescr() {
        return taskDescr;
    }

    public Task taskDescr(String taskDescr) {
        this.taskDescr = taskDescr;
        return this;
    }

    public void setTaskDescr(String taskDescr) {
        this.taskDescr = taskDescr;
    }

    public Set<Comment> getComments() {
        return comments;
    }

    public Task comments(Set<Comment> comments) {
        this.comments = comments;
        return this;
    }

    public Task addComments(Comment comment) {
        this.comments.add(comment);
        comment.setTask(this);
        return this;
    }

    public Task removeComments(Comment comment) {
        this.comments.remove(comment);
        comment.setTask(null);
        return this;
    }

    public void setComments(Set<Comment> comments) {
        this.comments = comments;
    }

    public Status getStatus() {
        return status;
    }

    public Task status(Status status) {
        this.status = status;
        return this;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Project getProject() {
        return project;
    }

    public Task project(Project project) {
        this.project = project;
        return this;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public Set<User> getUsers() {
        return users;
    }

    public Task users(Set<User> userrs) {
        this.users = userrs;
        return this;
    }

    public Task addUsers(User userr) {
        this.users.add(userr);
        userr.getTasks().add(this);
        return this;
    }

    public Task removeUsers(User userr) {
        this.users.remove(userr);
        userr.getTasks().remove(this);
        return this;
    }

    public void setUsers(Set<User> userrs) {
        this.users = userrs;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Task task = (Task) o;
        if (task.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), task.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Task{" +
            "id=" + getId() +
            ", taskName='" + getTaskName() + "'" +
            ", taskDescr='" + getTaskDescr() + "'" +
            "}";
    }
}
